const express = require("express");
// Importing the Stock model to interact with stock data
const Stock = require("../Models/StockModel");
// Creating a new router instance
const router = express.Router();

// Route to get all stock items or filter by distributor ID
router.get("/", async (req, res) => {
  // Extracting distributorId from the query parameters
  const distributorId = req.query.distributorId; // Get distributorId from query parameters
  try {
    // Fetching stock items based on the presence of distributorId
    const stocks = distributorId
      ? await Stock.find({ distributorId }) // If distributorId is provided, filter by distributorId
      : await Stock.find(); // Otherwise, return all stock items

    // Responding with the fetched stock items in JSON format
    res.json(stocks);
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error response with the error message
    res.status(500).json({ message: error.message });
  }
});

// Route to get a specific stock item by its ID
router.get("/:id", async (req, res) => {
  try {
    // Fetching the stock item by ID from the request parameters
    const stockItem = await Stock.findById(req.params.id);
    // If the stock item is not found, return a 404 Not Found response
    if (!stockItem) {
      return res.status(404).json({ message: "Stock item not found" });
    }
    // Responding with the found stock item in JSON format
    res.json(stockItem);
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching stock item:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: error.message });
  }
});

// Route to update a specific stock item by its ID
router.put("/:id", async (req, res) => {
  try {
    // Extracting variants from the request body
    const { variants } = req.body;

    // Calculate totalAvailableUnits for each variant
    if (variants && Array.isArray(variants)) {
      // Iterating through each variant to calculate total available units
      variants.forEach((variant) => {
        const {
          unitsPerPackage,
          stocksInPackage,
          leftoverUnits,
          returnQuantity,
        } = variant.stockDetails;
        // Calculating total available units
        variant.stockDetails.totalAvailableUnits =
          stocksInPackage * unitsPerPackage + leftoverUnits - returnQuantity;
      });
    }

    // Finding the stock item by ID and updating it with the new data
    const updatedItem = await Stock.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // If the stock item is not found, return a 404 Not Found response
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    // Responding with the updated stock item in JSON format
    res.json(updatedItem);
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error response with the error message
    res.status(500).json({ message: error.message });
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
