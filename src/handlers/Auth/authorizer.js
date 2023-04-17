const JWT = require("jsonwebtoken");
const getSSMParameter = require("../../utils/ssmCalls");

module.exports.handler = async (event) => {
  try {
    const token = event?.headers?.Authorization;
    const methodArn = event?.methodArn;

    if (!token || !methodArn) throw Error("Missing information");

    const decoded = JWT.verify(token, await getSSMParameter("JWT_secret"));

    if (decoded?.userID) {
      return {
        principalId: decoded.userID,
        policyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Action: "execute-api:Invoke",
              Effect: "Allow",
              Resource: methodArn,
            },
          ],
        },
      };
    } else {
      throw Error("Unauthorized");
    }
  } catch (error) {
    throw Error("Unauthorized");
  }
};
