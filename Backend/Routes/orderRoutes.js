const express = require("express");
const router = express.Router();
const Order = require("../Models/Order");
const Razorpay = require("razorpay");
const Distributor = require("../Models/Distributor");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Creating a new order and initiate payment
router.post("/", async (req, res) => {
  try {
    const {
      productName,
      productId,
      distributorId,
      variantId,
      attributes,
      pricing,
      quantity,
      cgst,
      sgst,
      retailerId,
      retailerName,
    } = req.body;

    if (!retailerId || !retailerName) {
      return res.status(400).json({ message: "Retailer details are missing!" });
    }

    const totalAmount = (pricing.retailPriceWithTax * quantity).toFixed(2);
    const orderDate = new Date();
    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(orderDate.getDate() + 1);

    // Creating a Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt#${new Date().getTime()}`,
      payment_capture: 1,
    });

    const newOrder = new Order({
      productName,
      productId,
      distributorId,
      variantId,
      retailerId,
      retailerName,
      attributes,
      pricing,
      quantity,
      cgst,
      sgst,
      totalAmount,
      completeStatus: "Pending",
      paymentStatus: "Pending",
      orderDate,
      expectedDeliveryDate,
      razorpayOrderId: razorpayOrder.id, // Saving Razorpay order ID
    });

    await newOrder.save();
    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder,
      razorpayOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error while placing order" });
  }
});

// Verify payment
router.post("/verify-payment", async (req, res) => {
  const { paymentId, orderId } = req.body;

  try {
    const order = await Order.findOne({ razorpayOrderId: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Updating order status and save paymentId
    order.paymentStatus = "Success";
    order.paymentId = paymentId; // Save the payment ID
    await order.save();

    // Fetching distributor details
    const distributor = await Distributor.findById(order.distributorId);
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found!" });
    }

    res.status(200).json({ message: "Payment verified successfully", order });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Server error while verifying payment" });
  }
});

module.exports = router;
