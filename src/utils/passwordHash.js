const bcrypt = require("bcryptjs");
const errors = require("../utils/errors");

const createHash = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, await bcrypt.genSalt(10));
};

const comparePassword = async (plainPassword, userHashPassword) => {
  const matchPasswords = await bcrypt.compare(plainPassword, userHashPassword);
  if (!matchPasswords) throw new errors.NotAuthorizedError();
};

module.exports = {
  createHash,
  comparePassword,
};
