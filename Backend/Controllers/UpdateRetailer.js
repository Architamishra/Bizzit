//Profile Updation for Retailer
// controllers/UpdateRetailer.js

// Importing the Retailer model to interact with retailer data
const Retailer = require("../Models/Retailer");

// Function to get Retailer Profile by User ID
const getRetailerProfile = async (req, res) => {
  try {
    // Extracting userId from the route parameters
    const { userId } = req.params;
    console.log("Received userId:", userId); // Log the received userId

    // Check if userId is provided
    if (!userId) {
      console.error("User  ID is required");
      return res.status(400).json({ message: "User  ID is required" }); // Return a 400 Bad Request if userId is missing
    }

    // Find the retailer by matching the user field
    const retailer = await Retailer.findOne({ user: userId });
    console.log("Fetched retailer:", retailer); // Log the fetched retailer

    // If no retailer is found, return a 404 Not Found response
    if (!retailer) {
      console.error("Retailer not found for userId:", userId);
      return res.status(404).json({ message: "Retailer not found" });
    }

    // Respond with the retailer profile in JSON format
    res.json(retailer);
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching retailer profile:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Server Error", error });
  }
};

// Function to update Retailer Profile
const updateRetailerProfile = async (req, res) => {
  try {
    // Extracting userId from the route parameters
    const { userId } = req.params;
    console.log("Updating retailer for userId:", userId); // Log the userId for update

    // Find the retailer by matching the user field
    let retailer = await Retailer.findOne({ user: userId });
    console.log("Fetched retailer for update:", retailer); // Log the fetched retailer

    // If no retailer is found, return a 404 Not Found response
    if (!retailer) {
      console.error("Retailer not found for userId:", userId);
      return res.status(404).json({ message: "Retailer not found" });
    }

    // Update the retailer object with the new data from the request body
    Object.assign(retailer, req.body);
    console.log("Updated retailer data:", retailer); // Log the updated retailer data

    // Validate the updated retailer before saving to the database
    const updatedRetailer = await retailer.save();
    // Respond with the updated retailer profile in JSON format
    res.json(updatedRetailer);
  } catch (error) {
    // Log any errors that occur during the update process
    console.error("Update Error:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Exporting the functions for use in other parts of the application
module.exports = { getRetailerProfile, updateRetailerProfile };
