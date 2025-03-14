const mongoose = require("mongoose");

const logoutSchema = new mongoose.Schema(
  {
    retailerId: { type: String, required: true },
    retailerName: { type: String, required: true },
    emailId: { type: String, required: true },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    time: { type: String, required: true }, // Format: HH:MM:SS
  },
  { timestamps: true }
);

const Logout = mongoose.model("Logout", logoutSchema);

module.exports = Logout;
