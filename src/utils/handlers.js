const handleError = (error = {}) => {
  console.error(error);
  return {
    statusCode: error.code ? error.code : 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      status: false,
      message: error.message ? error.message : "Unexpected error",
    }),
  };
};

const handleReturn = ({ statusCode, body }) => {
  return {
    statusCode,
    body: JSON.stringify(body, null, 2),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};

module.exports = {
  handleError,
  handleReturn,
};
