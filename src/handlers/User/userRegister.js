const JWT = require("jsonwebtoken");
const { randomUUID } = require("crypto");
const errors = require("../../utils/errors");
const getSSMParameter = require("../../utils/ssmCalls");
const { createHash } = require("../../utils/passwordHash");
const { databaseConnect, UserSchema } = require("../../database");
const { handleError, handleReturn } = require("../../utils/handlers");
const {
  userRegisterValidation,
  validateSchema,
} = require("../../utils/validations");

module.exports.handler = async (event) => {
  try {
    const body = validateSchema(userRegisterValidation, event);

    const database = await databaseConnect(UserSchema);

    const alreadyRegistered = await database
      .model(UserSchema.name)
      .findOne({ userEmail: body.userEmail })
      .lean();

    if (alreadyRegistered) throw new errors.DuplicatedRegisterError();

    const generatedUserID = randomUUID();

    await database
      .model(UserSchema.name)({
        ...body,
        userID: generatedUserID,
        userPassword: await createHash(body.userPassword),
      })
      .save();

    const token = JWT.sign(
      {
        userID: generatedUserID,
      },
      await getSSMParameter("JWT_secret"),
      {
        expiresIn: "1h",
      }
    );

    return handleReturn({
      statusCode: 201,
      body: {
        status: true,
        token,
      },
    });
  } catch (err) {
    return handleError(err);
  }
};
