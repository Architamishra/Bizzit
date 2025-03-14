
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    connectCode: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    dealershipStatus: { type: String, default: "inactive" } 
});


const supplierSchema = new mongoose.Schema({
    suppid: { type: String, required: true, unique: true }, 
    distributorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    products: [productSchema],
}, { timestamps: true, collection: 'Supplier' }); 

const AddSupplier = mongoose.model('AddSupplier', supplierSchema);

module.exports = AddSupplier;