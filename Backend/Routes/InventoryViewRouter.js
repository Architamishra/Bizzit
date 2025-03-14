const express = require("express");
// Importing the ProductInventory model to interact with product inventory data
const ProductInventory = require("../Models/ProductInventory");
// Creating a new router instance
const router = express.Router();

// Route to get inventory items
router.get("/", async (req, res) => {
  // Extracting the distributorId from the query parameters
  const distributorId = req.query.distributorId; // Get distributorId from query parameters
  try {
    // Fetching inventory items based on the presence of distributorId
    const inventoryItems = distributorId
      ? await ProductInventory.find({ distributorId }) // If distributorId is provided, filter by distributorId
      : await ProductInventory.find(); // Otherwise, return all inventory items

    // Responding with the fetched inventory items in JSON format
    res.json(inventoryItems);
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error response with the error message
    res.status(500).json({ message: error.message });
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
