const Movie = require('../models/movie');

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

  Movie.deleteOne({ _id })
    .then(() => res.status(200).send())
    .catch(next);
};
