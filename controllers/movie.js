const { isValidObjectId } = require('mongoose');
const Movie = require('../models/movie');
const IncorrectDataError = require('../errors/IncorrectDataError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;

  Movie.create({
    ...req.body,
    owner: userId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(userId)) {
    throw new IncorrectDataError('Переданы некорректные данные для удаления фильма');
  }

  Movie.findById(_id)
    .then((movie) => {
      if (!movie.owner.equals(userId)) {
        throw new ForbiddenError('Вы не можете удалить чужой фильм');
      }
      return Movie.deleteOne({ _id });
    })
    .then(({ deletedCount }) => {
      if (!deletedCount) {
        throw new Error('Серверная ошибка');
      }
      return res.status(200).send({ message: 'Фильм удалён' });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Фильм не найден'));
      }
      next(err);
    });
};
