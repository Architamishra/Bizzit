const express = require("express");
// Importing the User model to interact with user data
const UserModel = require("../Models/user"); // Adjust the path as necessary
// Importing the Distributor model to interact with distributor data
const Distributor = require("../Models/Distributor"); // Adjust the path as necessary
// Creating a new router instance
const router = express.Router();

// GET all users (Admin only)
// This route is intended for admin users to fetch all registered users
router.get("/users", async (req, res) => {
  try {
    // Fetching all users from the database
    const users = await UserModel.find(); // Fetch all users
    // Responding with the list of users in JSON format
    res.json(users);
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error response
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET distributor details by user ID
router.get("/distributors/:id", async (req, res) => {
  try {
    // Extracting the distributor ID from the request parameters
    const distributorId = req.params.id;
    // Fetching distributor details from the database using the user ID
    const distributor = await Distributor.findOne({ user: distributorId }); // Fetch distributor details

    // If no distributor is found, return a 404 Not Found response
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }
    // Responding with the distributor details in JSON format
    res.json(distributor);
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error response
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
