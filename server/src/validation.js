const Joi = require('joi');

function validateEvent(event) {
  const schema = Joi.object({
    title: Joi.string().required(),
    subject: Joi.string().required(),
    dateStart: Joi.date().iso().required(),
    dateEnd: Joi.date().iso().required(),
    description: Joi.string().required(),
    backgroundColor: Joi.string().required(),
  });

  return schema.validate(event);
}

module.exports = { validateEvent };