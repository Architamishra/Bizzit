const express = require("express");
// Importing the Razorpay library to handle payment processing
const Razorpay = require("razorpay");
// Importing the crypto library for cryptographic functions
const crypto = require("crypto");

// Creating a new router instance
const router = express.Router();

// Creating an instance of Razorpay with API keys
const razorpay = new Razorpay({
  key_id: "rzp_test_bWCrBPFrJXgT5W", // Your Razorpay key ID
  key_secret: "rKJIrjp4k33INN0HMHYFeDVR", // Your Razorpay key secret
});

// 🔹 1. Create Order API
// This route handles the creation of a new order
router.post("/create-order", async (req, res) => {
  try {
    // Extracting amount and orderId from the request body
    const { amount, orderId } = req.body;

    // Defining options for the order
    const options = {
      amount: amount * 100, // Convert amount to paise (1 INR = 100 paise)
      currency: "INR", // Currency type
      receipt: `order_rcptid_${orderId}`, // Unique receipt ID for the order
    };

    // Creating the order using Razorpay API
    const order = await razorpay.orders.create(options);
    // Responding with success and the created order details
    res.json({ success: true, order });
  } catch (error) {
    // Log any errors that occur during order creation
    console.error("❌ Razorpay Order Error:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ success: false, message: "Payment error" });
  }
});

// 🔹 2. Verify Payment API
// This route handles the verification of a payment
router.post("/verify-payment", async (req, res) => {
  try {
    // Extracting payment details from the request body
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Creating a string to verify the payment signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    // Generating the expected signature using HMAC SHA256
    const expectedSignature = crypto
      .createHmac("sha256", "YOUR_RAZORPAY_SECRET") // Replace with your Razorpay secret
      .update(sign)
      .digest("hex");

    // Comparing the expected signature with the actual signature
    if (expectedSignature === razorpay_signature) {
      // If signatures match, payment is verified
      res.json({ success: true, message: "Payment verified!" });
    } else {
      // If signatures do not match, verification failed
      res.json({ success: false, message: "Payment verification failed!" });
    }
  } catch (error) {
    // Log any errors that occur during payment verification
    console.error("❌ Payment Verification Error:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ success: false, message: "Verification error" });
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
