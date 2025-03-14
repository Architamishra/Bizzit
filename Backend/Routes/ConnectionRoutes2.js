const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Connection = require("../Models/Connection");

// Send connection request
router.post("/request", async (req, res) => {
  try {
    const { retailerId, distributorId } = req.body; // Ensure retailerId is properly sent

    if (!mongoose.Types.ObjectId.isValid(retailerId)) {
      return res.status(400).json({ error: "Invalid retailerId format" });
    }

    if (!mongoose.Types.ObjectId.isValid(distributorId)) {
      return res.status(400).json({ error: "Invalid distributorId format" });
    }

    // Check if the connection already exists
    const existingConnection = await Connection.findOne({
      retailerId,
      distributorId,
    });

    if (existingConnection) {
      return res
        .status(400)
        .json({ error: "Connection request already exists" });
    }

    const connectionRequest = new Connection({
      retailerId: new mongoose.Types.ObjectId(retailerId),
      distributorId: new mongoose.Types.ObjectId(distributorId),
      status: "pending",
    });

    await connectionRequest.save();
    res.status(201).json({ message: "Connection request sent successfully" });
  } catch (error) {
    console.error("Error creating connection request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all connection requests
router.get("/requests", async (req, res) => {
  try {
    const connections = await Connection.find().populate(
      "retailerId distributorId",
      "name email phoneNumber"
    );
    res.status(200).json(connections);
  } catch (error) {
    console.error("Error fetching connections:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/status/:retailerId", async (req, res) => {
  try {
    const { retailerId } = req.params;
    const connections = await Connection.find({ retailerId });

    res.status(200).json(
      connections.map(({ distributorId, status }) => ({
        distributorId,
        status,
      }))
    );
  } catch (error) {
    console.error("Error fetching connection status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
