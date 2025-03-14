const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  variantId: { type: String, required: true },
  retailerId: { type: String, required: true },
  distributorId: { type: String, required: true },
  retailerName: { type: String, required: true },
  productName: { type: String, required: true },
  attributes: { type: Object, required: true },
  pricing: { type: Object, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

CartSchema.index(
  { productId: 1, variantId: 1, retailerId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Cart", CartSchema);
