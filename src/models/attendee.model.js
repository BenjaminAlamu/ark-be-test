const mongoose = require("mongoose");

const attendeeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    talk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Talk",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Attendee = mongoose.model("Attendee", attendeeSchema);

module.exports = Attendee;
