//For adding and managing Suppliers
// Importing required modules
const mongoose = require("mongoose");
const AddSupplier = require("../Models/AddSupplier");
const {
  generateSupplierId,
  generateConnectCode,
} = require("../utils/SupplierIdGenerator");

// Function to create a new supplier
exports.createSupplier = async (req, res) => {
  try {
    // Generate a unique supplier ID
    const supplierId = generateSupplierId();

    // Map through the products in the request body to add a connect code and set dealership status
    const productsWithCodes = req.body.products.map((product) => ({
      ...product,
      connectCode: generateConnectCode(), // Generate a unique connect code for each product
      dealershipStatus: "inactive", // Set initial dealership status to inactive
    }));

    // Convert distributorId from string to MongoDB ObjectId
    const userObjectId = new mongoose.Types.ObjectId(req.body.distributorId);
    console.log("✅ Converted distributorId to ObjectId:", userObjectId);

    // Create a new supplier object with the provided data
    const supplier = new AddSupplier({
      ...req.body,
      suppid: supplierId, // Assign the generated supplier ID
      products: productsWithCodes, // Include the products with their codes
      distributorId: userObjectId, // Save distributorId as ObjectId
    });

    // Save the supplier to the database
    await supplier.save();
    // Respond with the created supplier object
    res.status(201).json(supplier);
  } catch (error) {
    // Handle any errors that occur during the creation process
    res.status(400).json({ message: error.message });
  }
};

// Function to retrieve all suppliers
exports.getSuppliers = async (req, res) => {
  try {
    // Fetch all suppliers from the database
    const suppliers = await AddSupplier.find();
    // Respond with the list of suppliers
    res.status(200).json(suppliers);
  } catch (error) {
    // Handle any errors that occur during the fetching process
    res.status(500).json({ message: error.message });
  }
};

// Function to retrieve a specific supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    // Find the supplier by ID from the request parameters
    const supplier = await AddSupplier.findById(req.params.id);
    // If the supplier is not found, return a 404 error
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    // Respond with the found supplier
    res.status(200).json(supplier);
  } catch (error) {
    // Handle any errors that occur during the fetching process
    res.status(500).json({ message: error.message });
  }
};

// Function to update a supplier's information
exports.updateSupplier = async (req, res) => {
  try {
    // Find the supplier by ID and update it with the new data
    const supplier = await AddSupplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // If the supplier is not found, return a 404 error
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    // Respond with the updated supplier
    res.status(200).json(supplier);
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a supplier by ID
exports.deleteSupplier = async (req, res) => {
  try {
    // Find the supplier by ID and delete it
    const supplier = await AddSupplier.findByIdAndDelete(req.params.id);
    // If the supplier is not found, return a 404 error
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    // Respond with a 204 No Content status to indicate successful deletion
    res.status(204).send();
  } catch (error) {
    // Handle any errors that occur during the deletion process
    res.status(500).json({ message: error.message });
  }
};

// Function to update the dealership status of a product within a supplier
exports.updateDealershipStatus = async (req, res) => {
  const { productId } = req.params; // Extract productId from request parameters
  const { dealershipStatus } = req.body; // Extract dealershipStatus from request body

  try {
    // Find the supplier that contains the product with the given productId
    const supplier = await AddSupplier.findOne({ "products._id": productId });
    // If the supplier or product is not found, return a 404 error
    if (!supplier) {
      return res.status(404).json({ message: "Supplier or product not found" });
    }

    // Find the specific product within the supplier's products
    const product = supplier.products.id(productId);
    // Update the dealership status of the product
    product.dealershipStatus = dealershipStatus;
    // Save the updated supplier
    await supplier.save();

    // Respond with a success message and the updated product
    res
      .status(200)
      .json({ message: "Dealership status updated successfully", product });
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).json({ message: error.message });
  }
};

// Function to retrieve active products for a specific supplier
exports.getActiveProductsBySupplier = async (req, res) => {
  const { supplierId } = req.params; // Extract supplierId from request parameters

  try {
    // Find the supplier by its unique supplier ID
    const supplier = await AddSupplier.findOne({ suppid: supplierId });
    // If the supplier is not found, return a 404 error
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Filter the products to get only those with an active dealership status
    const activeProducts = supplier.products.filter(
      (product) => product.dealershipStatus === "active"
    );
    // Respond with the list of active products
    res.status(200).json(activeProducts);
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching active products:", error);
    res.status(500).json({ message: error.message });
  }
};
