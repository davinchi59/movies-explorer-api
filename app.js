require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const authMiddleware = require('./middlewares/auth');
const userController = require('./controllers/user');
const SignInValidation = require('./middlewares/validations/SignInValidation');
const SignUpValidation = require('./middlewares/validations/SignUpValidation');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/error');
const rateLimitOptions = require('./utils/rateLimitOptions');

const { PORT = 3001, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use(requestLogger);
app.use(rateLimit(rateLimitOptions));

app.post('/signup', SignUpValidation, userController.signUp);
app.post('/signin', SignInValidation, userController.signIn);

app.use(authMiddleware);

app.use('/users', require('./routes/user'));
app.use('/movies', require('./routes/movies'));

app.use((req, res, next) => {
  next(new NotFoundError('Такого роута не существует'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
