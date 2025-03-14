const express = require("express");
const Connection = require("../Models/Connection.js");

const router = express.Router();

// ✅ Get All Connections
router.get("/", async (req, res) => {
  try {
    const connections = await Connection.find();
    res.status(200).json(connections);
  } catch (error) {
    console.error("Error fetching connections:", error);
    res
      .status(500)
      .json({ message: "❌ Error fetching connections", error: error.message });
  }
});

// ✅ Create a New Connection Request
router.post("/", async (req, res) => {
  const { retailerId, retailerName, distributorId, distributorName } = req.body;

  if (!retailerId || !retailerName || !distributorId || !distributorName) {
    return res.status(400).json({ message: "❌ All fields are required!" });
  }

  try {
    const existingConnection = await Connection.findOne({
      retailerId,
      distributorId,
    });
    if (existingConnection) {
      return res
        .status(400)
        .json({ message: "⚠️ Connection request already exists!" });
    }

    const newConnection = new Connection({
      retailerId,
      retailerName,
      distributorId,
      distributorName,
      status: "Pending",
    });

    await newConnection.save();
    res.status(201).json({
      message: "✅ Connection request sent!",
      connection: newConnection,
    });
  } catch (error) {
    console.error("Error creating connection:", error);
    res
      .status(500)
      .json({ message: "❌ Error creating connection", error: error.message });
  }
});

// ✅ Update Connection Status (Pending → Accepted)
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  if (!status || (status !== "Pending" && status !== "Accepted")) {
    return res.status(400).json({ message: "❌ Invalid status value!" });
  }

  try {
    const updatedConnection = await Connection.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedConnection) {
      return res.status(404).json({ message: "❌ Connection not found!" });
    }

    res.status(200).json({
      message: "✅ Connection status updated!",
      connection: updatedConnection,
    });
  } catch (error) {
    console.error("Error updating connection status:", error);
    res.status(500).json({
      message: "❌ Error updating connection status",
      error: error.message,
    });
  }
});

module.exports = router;
