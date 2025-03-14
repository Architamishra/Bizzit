const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    lastLoginDate: { type: String },
    lastLoginTime: { type: String },
    subscription: {
      status: {
        type: String,
        enum: ["Trial", "active", "expired"],
        default: "Trial",
      },
      type: {
        type: String,
        enum: ["Trial", "Monthly", "Yearly"],
        default: "Trial",
      },
      startDate: { type: Date, default: Date.now },
      endDate: { type: Date, default: Date.now() + 30 * 24 * 60 * 60 * 1000 }, // 30 days from now
      nextBillingDate: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
