const mongoose = require("mongoose");
const getSSMParameter = require("../utils/ssmCalls");

let cachedConnection = null;

module.exports = async (model = null) => {
  if (cachedConnection && cachedConnection.readyState == 1)
    return cachedConnection;

  const mongoString = await getSSMParameter("mongodb-dev");

  let _connection = mongoose.createConnection(mongoString, {
    dbName: "Chat",
    keepAlive: true,
  });

  if (model) _connection.model(model.name, model.schema);

  cachedConnection = _connection;

  return _connection;
};
