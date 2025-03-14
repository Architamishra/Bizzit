const express = require("express");
const Return = require("../Models/ReturnModel");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { productId, productName, orderDate, reason, returnDate } = req.body;

    const newReturn = new Return({
      productId,
      productName,
      orderDate,
      reason,
      returnDate,
      acceptanceStatus: "Pending",
      completionStatus: "Pending",
    });

    await newReturn.save();
    res.status(201).json({ message: "Return request saved successfully." });
  } catch (error) {
    console.error("Error saving return request:", error);
    res.status(500).json({ error: "Failed to save return request." });
  }
});

module.exports = router;
