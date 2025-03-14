const express = require("express");
// Importing necessary controller functions for handling product inventory
const {
  add,
  getInventoryItem,
} = require("../Controllers/AddProductController");
const addProductValidation = require("../Middlewares/AddProductValidation"); // Middleware for validating product data
const {
  updateInventoryItem,
} = require("../Controllers/UpdateInventoryController");
const ProductInventory = require("../Models/ProductInventory"); // Model for product inventory
const Stock = require("../Models/StockModel"); // Model for stock items
// Creating a new router instance
const router = express.Router();

// Route to add a new product to the inventory
// This route uses the addProductValidation middleware to validate the request data before adding the product
router.post("/add", addProductValidation, add);

// Route to get a specific inventory item by its ID
router.get("/:id", getInventoryItem);

// Route to update an inventory item by its ID
router.put("/:id", updateInventoryItem);

// Route to delete an inventory item by its ID
router.delete("/:id", async (req, res) => {
  // Extracting the ID of the inventory item to be deleted from the request parameters
  const { id } = req.params;

  // Logging the attempt to delete the inventory item
  console.log(`Attempting to delete inventory item with ID: ${id}`);

  try {
    // Attempting to find and delete the inventory item by its ID
    const deletedInventoryItem = await ProductInventory.findByIdAndDelete(id);
    // Logging the deleted inventory item for debugging
    console.log(`Deleted inventory item: ${deletedInventoryItem}`);

    // If no inventory item is found, return a 404 Not Found response
    if (!deletedInventoryItem) {
      return res
        .status(404)
        .json({ message: "Product inventory item not found" });
    }

    // Attempting to delete all stock items associated with the deleted product
    const deletedStockItems = await Stock.deleteMany({ productId: id });
    // Logging the deleted stock items for debugging
    console.log(`Deleted stock items: ${deletedStockItems}`);

    // Responding with a success message
    res.status(200).json({ message: "Product and stock deleted successfully" });
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.error("Error deleting product and stock:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: error.message });
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
