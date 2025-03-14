const express = require("express");
const router = express.Router();
const Order = require("../Models/Order"); // Assuming you have an Order model

// GET orders for a specific distributor
router.get("/orderView", async (req, res) => {
  const distributorId = req.query.distributorId; // Get distributor ID from query params

  if (!distributorId) {
    return res.status(400).json({ message: "Distributor ID is required" });
  }

  try {
    console.log(`Fetching orders for distributor ID: ${distributorId}`); // Log the distributor ID

    const orders = await Order.find({ distributorId })
      .populate("productId", "productName") // Populate the product name
      .select(
        "productName retailerId retailerName distributorId quantity totalAmount orderDate expectedDeliveryDate AcceptanceStatus paymentStatus completeStatus cgst sgst attributes variantId"
      ); // Select only the fields you need

    // Check if orders are found
    if (orders.length === 0) {
      return res
        .status(200)
        .json({ message: "No orders found for this distributor" }); // Return a message instead of 404
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

module.exports = router;
