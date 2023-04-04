const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    talk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Talk",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
