const express = require("express");
const Logout = require("../Models/LogoutModel"); // Adjust path if necessary

const router = express.Router();

// Route to get all logout logs
router.get("/logout-logs", async (req, res) => {
  try {
    const logs = await Logout.find().sort({ createdAt: -1 }); // Fetch logs in descending order
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logout logs", error });
  }
});

module.exports = router;
