const bcrypt = require("bcryptjs");

const createHash = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, await bcrypt.genSalt(10));
};

const comparePassword = async (plainPassword, userHashPassword) => {
  const matchPasswords = await bcrypt.compare(plainPassword, userHashPassword);
  if (!matchPasswords) throw new NotAuthorizedError();
};

module.exports = {
  createHash,
  comparePassword,
};
