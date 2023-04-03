const Joi = require("@hapi/joi");
const mongoIdPattern = /^[0-9a-fA-F]{24}$/;

const register = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().required().messages({
        "string.empty": ` First Name cannot be an empty field`,
        "any.required": ` First Name is a required field`,
      }),
      lastName: Joi.string().required().messages({
        "string.empty": ` Last Name cannot be an empty field`,
        "any.required": ` Last Name is a required field`,
      }),
      email: Joi.string().email().required().messages({
        "string.empty": `Email cannot be an empty field`,
        "string.email": `Email must be valid`,
        "any.required": `Email is a required field`,
      }),
      talk: Joi.string().pattern(mongoIdPattern).required().messages({
        "string.empty": `Talk Must be passed cannot be an empty field`,
        "any.required": `Talk is a required field`,
        "string.pattern": `Talk must be a valid Mongo ID`,
      }),
    })
    .unknown(),
};

const access = {
  params: Joi.object().keys({
    talk: Joi.string().pattern(mongoIdPattern).required().messages({
      "string.empty": `ID Must be passed cannot be an empty field`,
      "any.required": `ID is a required field`,
      "string.pattern": `ID must be a valid Mongo ID`,
    }),
  }),
  query: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email must be valid`,
      "any.required": `Email is a required field`,
    }),
  }),
};

module.exports = {
  register,
  access,
};
