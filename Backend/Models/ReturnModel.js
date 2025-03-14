const mongoose = require("mongoose");

const ReturnSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: { type: String, required: true },
  orderDate: { type: Date, required: true },
  reason: { type: String, required: true },
  returnDate: { type: Date, required: true },
  acceptanceStatus: { type: String, default: "Pending" },
  completionStatus: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Return", ReturnSchema);
