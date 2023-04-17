const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");

let cachedParameters = {};
const client = new SSMClient({ region: "sa-east-1" });

const getParameterFromSSM = async (parameterName) => {
  const command = new GetParameterCommand({
    Name: parameterName,
    WithDecryption: true,
  });

  const data = await client.send(command);
  cachedParameters[parameterName] = data.Parameter.Value;

  return data.Parameter.Value;
};

module.exports = async (parameterName) => {
  return (
    cachedParameters[parameterName] ||
    (await getParameterFromSSM(parameterName))
  );
};
