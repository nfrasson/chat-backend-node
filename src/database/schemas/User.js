const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  userID: { type: String, unique: true, index: true },
  email: { type: String, unique: true, index: true },
  password: String,
});

module.exports = {
  name: "User",
  schema: UserSchema,
};
