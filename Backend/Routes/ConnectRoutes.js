const express = require("express");
const router = express.Router();
const Distributor = require("../Models/Distributor"); // Assuming Distributor model is in `models` folder

// Route to get all distributors
router.get("/distributors", async (req, res) => {
  try {
    const distributors = await Distributor.find(
      {},
      "fullname email phoneNumber"
    );
    res.json(distributors);
  } catch (error) {
    console.error("Error fetching distributors:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
