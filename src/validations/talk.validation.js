const Joi = require("@hapi/joi");
const mongoIdPattern = /^[0-9a-fA-F]{24}$/;

const create = {
  body: Joi.object()
    .keys({
      name: Joi.string().required().messages({
        "string.empty": ` Name cannot be an empty field`,
        "any.required": ` Name is a required field`,
      }),
      description: Joi.string().required().messages({
        "string.empty": ` Description cannot be an empty field`,
        "any.required": ` Description is a required field`,
      }),
      image: Joi.string().required().messages({
        "string.empty": ` Image cannot be an empty field`,
        "any.required": ` Image is a required field`,
      }),
      eventDate: Joi.string().required().messages({
        "string.empty": ` Event Date cannot be an empty field`,
        "any.required": ` Event Date is a required field`,
      }),
      eventTime: Joi.string().required().messages({
        "string.empty": ` Event Time cannot be an empty field`,
        "any.required": ` Event Time is a required field`,
      }),
    })
    .unknown(),
};

const get = {
  params: Joi.object().keys({
    _id: Joi.string().pattern(mongoIdPattern).required().messages({
      "string.empty": `ID Must be passed cannot be an empty field`,
      "any.required": `ID is a required field`,
      "string.pattern": `ID must be a valid Mongo ID`,
    }),
  }),
};

module.exports = {
  create,
  get,
};
