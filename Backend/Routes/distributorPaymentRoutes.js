// Importing the express library to create a router
const express = require("express");
// Creating a new router instance
const router = express.Router();
// Importing the Distributor model to interact with distributor data
const Distributor = require("../Models/Distributor"); // Import Distributor model
// Importing the Order model to interact with order data
const Order = require("../Models/Order"); // Import Order model
// Importing Razorpay for payment processing
const Razorpay = require("razorpay");
// Loading environment variables from .env file
require("dotenv").config();

// Initializing Razorpay with API keys from environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Fetch distributor details by distributor ID
router.get("/:distributorId", async (req, res) => {
  // Extracting distributorId from request parameters
  const { distributorId } = req.params;

  try {
    // Fetching distributor details from the database
    const distributor = await Distributor.findById(distributorId);
    // If distributor is not found, return a 404 Not Found response
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found!" });
    }

    // Return relevant distributor details
    const { upiId, phoneNumber, fullname } = distributor;
    res.status(200).json({ upiId, phoneNumber, fullname });
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching distributor details:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res
      .status(500)
      .json({ message: "Server error while fetching distributor details" });
  }
});

// Example endpoint to handle payment processing for a distributor
router.post("/process-payment", async (req, res) => {
  // Extracting orderId and paymentId from the request body
  const { orderId, paymentId } = req.body;

  try {
    // Fetching the order details from the database
    const order = await Order.findById(orderId);
    // If order is not found, return a 404 Not Found response
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    // Fetching the distributor details associated with the order
    const distributor = await Distributor.findById(order.distributorId);
    // If distributor is not found, return a 404 Not Found response
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found!" });
    }

    // Here you can implement the logic to process the payment to the distributor
    // For example, you might want to use Razorpay's transfer API to send money to the distributor's UPI ID

    // Placeholder for the actual payment processing logic
    // Uncomment and implement the following lines to process the payment
    /*
    const paymentResponse = await razorpay.transfers.create({
      amount: order.totalAmount * 100, // Amount in paise
      currency: "INR",
      destination: distributor.upiId,
      // Additional parameters as required by Razorpay
    });
    */

    // Update order status or any other logic as needed
    order.paymentStatus = "Paid"; // Update payment status
    await order.save(); // Save the updated order

    // Responding with a success message and the updated order details
    res.status(200).json({ message: "Payment processed successfully", order });
  } catch (error) {
    // Log any errors that occur during the payment processing
    console.error("Error processing payment:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Server error while processing payment" });
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
