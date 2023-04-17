const JWT = require("jsonwebtoken");
const getSSMParameter = require("../../utils/ssmCalls");
const { comparePassword } = require("../../utils/passwordHash");
const { databaseConnect, UserSchema } = require("../../database");
const {
  userLoginValidation,
  validateSchema,
} = require("../../utils/validations");
const { handleError, handleReturn } = require("../../utils/handlers");

module.exports.handler = async (event) => {
  try {
    const { email, password } = validateSchema(userLoginValidation, event);

    const database = await databaseConnect(UserSchema);
    const userData = await database
      .model(UserSchema.name)
      .findOne({ email })
      .lean();

    await comparePassword(password, userData?.password || "");

    const token = JWT.sign(
      {
        userID: userData.userID,
      },
      await getSSMParameter("JWT_secret"),
      {
        expiresIn: "1h",
      }
    );

    return handleReturn({
      statusCode: 200,
      body: {
        status: true,
        access_token: token,
      },
    });
  } catch (err) {
    return handleError(err);
  }
};
