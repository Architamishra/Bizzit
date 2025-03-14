const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema(
  {
    distributorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Reference to Users collection
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductInventory",
    },
    productName: { type: String, required: true },
    packagingType: { type: String, required: true },
    variants: [
      {
        variantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductInventory",
        },
        attributes: {
          Volume: { type: String, required: true },
          Color: { type: String, required: true },
          Weight: { type: String, required: true },
          Size: { type: String, required: true },
        },
        stockDetails: {
          unitsPerPackage: { type: Number, required: true },
          stocksInPackage: { type: Number, required: true },
          leftoverUnits: { type: Number, required: true },
          totalAvailableUnits: { type: Number, required: true },
          returnQuantity: { type: Number, required: true },
        },
        pricing: {
          cgst: { type: Number, required: true },
          sgst: { type: Number, required: true },
          retailPriceWithTax: { type: Number, required: true },
        },
      },
    ],
    reorderLevel: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now },
  },
  { collection: "Stocks" }
);

const Stock = mongoose.model("Stock", StockSchema);
module.exports = Stock;
