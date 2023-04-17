const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const { toUtf8 } = require("@aws-sdk/util-utf8-node");

const lambda = new LambdaClient({
  endpoint: "http://127.0.0.1:3001",
  region: "sa-east-1",
});

module.exports = async (FunctionName, Payload = {}) => {
  let response;
  try {
    const input = {
      FunctionName,
      Payload: JSON.stringify(Payload),
    };

    const command = new InvokeCommand(input);
    response = await lambda.send(command);

    return JSON.parse(toUtf8(response.Payload));
  } catch (error) {
    console.log(`${FunctionName}: ${Payload}`);
    console.log("Error: ", error);
    console.log("Response:", response);
  }
};
