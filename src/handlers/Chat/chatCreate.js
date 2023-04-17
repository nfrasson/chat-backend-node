const { randomUUID } = require("crypto");
const { handleError, handleReturn } = require("../../utils/handlers");
const { databaseConnect, ChatSchema } = require("../../database");
const { chatCreateValidation } = require("../../utils/validations");

module.exports.handler = async (event) => {
  try {
    const body = chatCreateValidation.validate(JSON.parse(event.body));

    const database = await databaseConnect(ChatSchema);

    const data = (
      await database.model(ChatSchema.name).create({
        ...body.value,
        chatID: randomUUID(),
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
