const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  messageID: { type: String, unique: true, index: true },
  messageContent: String,
  chatID: String,
  deletedAt: Date,
  createdAt: Date,
});

module.exports = {
  name: "Message",
  schema: Message,
};
