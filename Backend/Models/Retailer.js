const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, match: /^\d{10}$/ },
    workAddress: { type: String, required: true },
    role: { type: String, enum: ["retailer"], required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    password: { type: String, required: true },
    business: {
      businessName: { type: String, required: true },
      isAgreed: { type: Boolean, required: true },
    },
    businessDetails: {
      storeName: { type: String, required: true },
      productCategory: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    taxDetails: {
      state: { type: String, required: true },
      legalName: { type: String, required: true },
      gstNumber: { type: String, required: true },
      panNumber: { type: String, required: true },
    },
    bankDetails: {
      name: { type: String, required: true },
      accountHolderName: { type: String, required: true },
      accountType: { type: String, required: true },
      accountNumber: { type: String, required: true },
      reEnterAccountNumber: { type: String, required: true },
      ifscCode: { type: String, required: true },
      upiId: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Retailer", retailerSchema);
