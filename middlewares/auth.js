const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/NotAuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const HeaderAuth = req.get('Authorization');

  if (!HeaderAuth) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  const token = HeaderAuth.split(' ')[1];

  if (!token) {
    next(new NotAuthError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : '9200ad00c90faa69000dbd8602f720c0e0d0b30f5000c400e8c280a60a9700dc',
    );
  } catch (err) {
    next(new NotAuthError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
