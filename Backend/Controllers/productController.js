//Products of Specific Distributors
// Importing required models and libraries
const Stock = require("../Models/StockModel"); // Model for stock items
const Distributor = require("../Models/Distributor"); // Model for distributors
const mongoose = require("mongoose"); // Library for MongoDB object modeling

// Function to get products associated with a specific distributor
exports.getProductsByDistributor = async (req, res) => {
  try {
    // Extracting distributorId from the request parameters
    const { distributorId } = req.params;

    // Validate the format of the distributorId
    if (!mongoose.Types.ObjectId.isValid(distributorId)) {
      // If the ID format is invalid, return a 400 Bad Request response
      return res
        .status(400)
        .json({ message: "❌ Invalid Distributor ID format" });
    }

    // Find the distributor in the database using the provided distributorId
    const distributor = await Distributor.findById(distributorId);
    // If the distributor is not found, return a 404 Not Found response
    if (!distributor) {
      return res.status(404).json({ message: "🚫 Distributor not found" });
    }

    // Extract the userId associated with the distributor
    const userId = distributor.user;

    // 🔍 Fetch products along with their variants and stock details
    const products = await Stock.find({ distributorId: userId }).populate(
      "variants.variantId", // Populate the variantId field in the variants array
      "attributes stockDetails pricing" // Select specific fields to return
    );

    // If no products are found for the distributor, return a 404 response
    if (!products.length) {
      return res
        .status(404)
        .json({ message: "🚫 No products found for this distributor." });
    }

    // Respond with the list of products and a 200 OK status
    res.status(200).json(products);
  } catch (error) {
    // Log any errors that occur during the process
    console.error("❌ Server Error:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ error: "❌ Internal Server Error" });
  }
};
