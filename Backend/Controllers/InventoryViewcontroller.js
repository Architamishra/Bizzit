//For viewing all products from Inventory
// Importing the Product model to interact with the product inventory
const Product = require("../Models/InventoryViewModel");

// Function to get all products or filter by distributor ID
const getAllProducts = async (req, res) => {
  // Extracting distributorId from the query parameters of the request
  const distributorId = req.query.distributorId;

  try {
    // Check if distributorId is provided in the query parameters
    const products = distributorId
      ? await Product.find({ distributorId }) // If distributorId is provided, filter products by distributorId
      : await Product.find(); // If not, return all products from the inventory

    // Respond with the list of products in JSON format
    res.json(products);
  } catch (error) {
    // If an error occurs during the database operation, respond with a 500 Internal Server Error status
    res.status(500).json({ message: error.message });
  }
};

// Exporting the getAllProducts function for use in other parts of the application
module.exports = { getAllProducts };
