const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");
// Importing the Order model to interact with order data
const Order = require("../Models/Order");

// Route to get all orders for a specific retailer
// This route handles GET requests to /retailers/:retailerId
router.get("/retailers/:retailerId", async (req, res) => {
  // Extracting the retailerId from the request parameters
  const retailerId = req.params.retailerId;

  // Validating the format of the retailerId
  if (!mongoose.Types.ObjectId.isValid(retailerId)) {
    console.error("Invalid Retailer ID received:", retailerId);
    // If the retailerId is invalid, return a 400 Bad Request response
    return res.status(400).json({ message: "Invalid retailer ID" });
  }

  try {
    // Logging the retailerId for debugging purposes
    console.log(`Fetching orders for retailer: ${retailerId}`);
    // Fetching orders from the database for the specified retailerId
    const orders = await Order.find({ retailerId: retailerId });
    // Logging the found orders for debugging purposes
    console.log(`Orders found for retailer ${retailerId}:`, orders);
    // Responding with the list of orders in JSON format
    res.status(200).json(orders);
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching orders:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

module.exports = router;
