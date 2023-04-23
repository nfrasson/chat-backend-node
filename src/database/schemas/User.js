const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: String,
  userID: { type: String, unique: true, index: true },
  userEmail: { type: String, unique: true, index: true },
  userPassword: String,
  userChats: [String],
});

module.exports = {
  name: "User",
  schema: UserSchema,
};
