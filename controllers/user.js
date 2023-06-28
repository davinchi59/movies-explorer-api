const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotAuthError = require('../errors/NotAuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;

  User.findOneAndUpdate(userId, req.body, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.signUp = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      email,
      password: hashedPassword,
      name,
    }))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findOne({ email })
    .select('+password')
    .then(async (user) => {
      if (!user) throw NotAuthError('Почта или пароль введены неверно');
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) throw NotAuthError('Почта или пароль введены неверно');
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production'
          ? JWT_SECRET
          : '9200ad00c90faa69000dbd8602f720c0e0d0b30f5000c400e8c280a60a9700dc',
        { expiresIn: '7d' },
      );
      res.status(200).send({ _id: user._id, token });
    })
    .catch(next);
};
