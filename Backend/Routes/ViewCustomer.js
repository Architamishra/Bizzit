const express = require("express");
const router = express.Router();
const Retailer = require("../Models/Retailer");

// GET all retailers
router.get("/", async (req, res) => {
  try {
    const retailers = await Retailer.find();
    res.status(200).json(retailers);
  } catch (error) {
    console.error("Error fetching retailers:", error);
    res
      .status(500)
      .json({ message: "Error fetching retailers", error: error.message });
  }
});

module.exports = router;
