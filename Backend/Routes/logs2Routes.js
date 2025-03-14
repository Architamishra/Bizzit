const express = require("express");
const router = express.Router();
const UserModel = require("../Models/user");

// Fetch users with login logs
router.get("/login-logs", async (req, res) => {
  try {
    const users = await UserModel.find(
      {},
      "_id fullname email lastLoginDate lastLoginTime"
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching login logs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
