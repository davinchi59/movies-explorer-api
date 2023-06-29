const { celebrate } = require('celebrate');
const Joi = require('joi');

module.exports = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});
