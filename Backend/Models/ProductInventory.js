const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VariationSchema = new Schema({
    attributes: {
        Volume: { type: String, required: true },
        Color: { type: String, required: true },
        Weight: { type: String, required: true },
        Size: { type: String, required: true },
    },
    pricing: {
        buyPriceWithoutTax: { type: Number, required: true }, 
        buyCgst: { type: Number, required: true }, 
        buySgst: { type: Number, required: true }, 
        totalBuyPriceWithTax: { type: Number, required: true }, 
        retailPriceWithoutTax: { type: Number, required: true }, 
        retailCgst: { type: Number, required: true }, 
        retailSgst: { type: Number, required: true }, 
        totalRetailPriceWithTax: { type: Number, required: true }, 
        mrp: { type: Number, required: true }, 
        dateAdded: { type: Date, default: Date.now }, 
    }
});

// Product Inventory Schema
const ProductInventorySchema = new Schema({
    distributorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Reference to Users collection
        required: true
    },
    supplier: {
        id: { type: String, required: true },
        name: { type: String, required: true }, 
        connectionCode: { type: String, required: true }, 
    },
    product: {
        name: { type: String, required: true }, 
        code: { type: String, required: true }, 
        category: { type: String, required: true }, 
        description: { type: String, required: true }, 
    },
    variants: [VariationSchema], 
}, { collection: 'ProductInventory' });

const ProductInventory = mongoose.model('ProductInventory', ProductInventorySchema);
module.exports = ProductInventory;