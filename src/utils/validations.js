const Joi = require("joi");
const errors = require("./errors");

module.exports = {
  validateSchema: (schema, event) => {
    const validatedBody = schema.validate(
      typeof event.body === "object" ? event.body : JSON.parse(event.body)
    );

    if (validatedBody.error != null)
      throw new errors.DataValidationError(validatedBody.error.message);

    return validatedBody.value;
  },
  chatCreateValidation: Joi.object().keys({
    chatTitle: Joi.string().required(),
    chatDescription: Joi.string().required(),
    chatUsersID: Joi.array().items(Joi.string()).required(),
  }),
  chatListValidation: Joi.object().keys({
    userID: Joi.string().guid().required(),
    sortBy: Joi.string().default("createdAt"),
    sortDesc: Joi.boolean().default(true),
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(1).max(200).default(10),
  }),
  userLoginValidation: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{8,30}$/)
      .required(),
  }),
  userRegisterValidation: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{8,30}$/)
      .required(),
  }),
  messageSendValidation: Joi.object().keys({
    chatID: Joi.string().required(),
    messageContent: Joi.string().required(),
  }),
};
