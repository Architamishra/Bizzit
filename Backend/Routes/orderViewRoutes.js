const express = require("express");
const router = express.Router();
const Order = require("../Models/Order");
const StockModel = require("../Models/StockModel");

// Get orders for logged-in retailer
router.get("/retailer/:retailerId", async (req, res) => {
  try {
    const { retailerId } = req.params;

    const orders = await Order.find({ retailerId })
      .populate({
        path: "productId",
        select: "productName variations attributes",
      })
      .populate({
        path: "distributorId",
        select: "distributorName distributorContact",
      });

    console.log("Fetched Orders from DB:", orders);

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this retailer!" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
});

module.exports = router;
