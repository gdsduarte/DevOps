const Joi = require('joi');

function validateEvent(event) {
  const schema = Joi.object({
    title: Joi.string().required(),
    start: Joi.date().iso().required(),
    end: Joi.date().iso().required(),
  });

  return schema.validate(event);
}

module.exports = { validateEvent };