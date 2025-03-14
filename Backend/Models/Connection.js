const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  retailerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  distributorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  dateAccepted: { type: Date },
  status: { type: String, enum: ["pending", "Accepted"], default: "Pending" },
});

module.exports = mongoose.model("Connection", connectionSchema);
