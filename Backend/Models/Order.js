const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
  },
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Variant", // Assuming you have a Variant model
    required: true,
  },
  distributorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Distributor", // Ensure this matches the name of your Distributor model
    required: true,
  },
  retailerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Retailer",
    required: true,
  },
  retailerName: { type: String, required: true },
  attributes: { type: Object, required: true }, // Product attributes like Volume, Color, etc.
  quantity: { type: Number, required: true },
  pricing: {
    retailPriceWithTax: { type: Number, required: true },
  },
  cgst: { type: Number, required: true },
  sgst: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  AcceptanceStatus: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  completeStatus: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Success", "Paid"],
    default: "Pending",
  },
  paymentMode: {
    type: String,
    enum: ["Offline", "Online"],
    default: "Offline",
  },
  orderDate: { type: Date, default: Date.now },
  expectedDeliveryDate: { type: Date, required: true },
  razorpayOrderId: { type: String, required: true }, // Razorpay order ID
  paymentId: { type: String }, // New field for storing payment ID
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
