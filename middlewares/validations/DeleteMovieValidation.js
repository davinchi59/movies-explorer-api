const { celebrate } = require('celebrate');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = celebrate({
  params: Joi.object().keys({
    _id: Joi.objectId().required(),
  }),
});
