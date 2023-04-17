const { handleError, handleReturn } = require("../../utils/handlers");
const { ChatSchema, databaseConnect } = require("../../database");
const {
  chatListValidation,
  validateSchema,
} = require("../../utils/validations");

module.exports.handler = async (event) => {
  try {
    const body = validateSchema(chatListValidation, event);

    const database = await databaseConnect(ChatSchema);

    const data = await database
      .model(ChatSchema.name)
      .find(
        { chatUserID: body.userID, deletedAt: { $exists: false } },
        { _id: 0, __v: 0 }
      )
      .limit(body.perPage)
      .skip(body.perPage * (body.page - 1))
      .sort({ [body.sortBy]: body.sortDesc ? 1 : -1 })
      .lean();

    return handleReturn({
      statusCode: 200,
      body: {
        status: true,
        data,
      },
    });
  } catch (error) {
    return handleError(error);
  }
};
