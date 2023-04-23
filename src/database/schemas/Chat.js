const mongoose = require("mongoose");

const Chat = new mongoose.Schema({
  chatTitle: String,
  chatDescription: String,
  chatID: { type: String, unique: true, index: true },
  chatUsersID: [String],
  chatKind: {
    type: String,
    enum: ["personal", "group"],
  },
  chatMessagesHistory: [
    {
      messageSenderID: String,
      messageContent: String,
      messageDeletedAt: Date,
      messageSentAt: Date,
    },
  ],
  deletedAt: Date,
  createdAt: Date,
});

module.exports = {
  name: "Chat",
  schema: Chat,
};
