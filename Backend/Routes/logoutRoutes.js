const express = require("express");
const router = express.Router();
const Logout = require("../Models/LogoutModel"); // Import Logout model

// Route to store logout details
router.post("/logout", async (req, res) => {
  try {
    const { retailerId, retailerName, emailId } = req.body;

    if (!retailerId || !retailerName || !emailId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new logout entry
    const logoutEntry = new Logout({
      retailerId,
      retailerName,
      emailId,
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      time: new Date().toLocaleTimeString(), // HH:MM:SS
    });

    await logoutEntry.save();
    res.status(201).json({ message: "Logout recorded successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Error logging out", error });
  }
});

module.exports = router;
