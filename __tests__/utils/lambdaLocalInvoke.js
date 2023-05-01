import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { toUtf8 } from "@aws-sdk/util-utf8-node";

const lambda = new LambdaClient({
  endpoint: "http://127.0.0.1:3001",
  region: "sa-east-1",
});

const lambdaLocalInvoke = async (FunctionName, Payload = {}) => {
  let response;
  try {
    const input = {
      FunctionName,
      Payload: JSON.stringify({ body: Payload }),
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

export { lambdaLocalInvoke };
