const { celebrate } = require('celebrate');
const Joi = require('joi');
const regExps = require('../../utils/regExps');

module.exports = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regExps.url).required(),
    trailerLink: Joi.string().pattern(regExps.url).required(),
    thumbnail: Joi.string().pattern(regExps.url).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
