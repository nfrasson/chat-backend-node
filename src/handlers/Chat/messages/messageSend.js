const { randomUUID } = require("crypto");
const { handleError, handleReturn } = require("../../../utils/handlers");
const { databaseConnect, MessageSchema } = require("../../../common/database");
const {
  messageSendValidation,
  validateSchema,
} = require("../../../utils/validations");

module.exports.handler = async (event) => {
  try {
    const body = validateSchema(messageSendValidation, event);

    const database = await databaseConnect(MessageSchema);

    const data = (
      await database.model(ChatSchema.name).create({
        ...body.value,
        messageID: randomUUID(),
        createdAt: new Date(),
      })
    ).toJSON();

    return handleReturn({
      statusCode: 201,
      body: {
        status: true,
        data,
      },
    });
  } catch (error) {
    return handleError(error);
  }
};
