const express = require("express");
// Importing the Retailer model to interact with retailer data
const Retailer = require("../Models/Retailer"); // Adjust the path as necessary
// Creating a new router instance
const router = express.Router();

// GET retailer details by user ID
router.get("/:id", async (req, res) => {
  try {
    // Extracting the retailer ID from the request parameters
    const retailerId = req.params.id; // This should be the user ID
    console.log(`Received request for retailer ID: ${retailerId}`); // Debugging log

    // Fetching retailer details from the database using the user ID
    const retailer = await Retailer.findOne({ user: retailerId }); // Fetch retailer details
    console.log(`Fetched retailer: ${JSON.stringify(retailer)}`); // Debugging log

    // If no retailer is found, return a 404 Not Found response
    if (!retailer) {
      console.log("Retailer not found"); // Debugging log
      return res.status(404).json({ message: "Retailer not found" });
    }

    // Respond with the retailer details in JSON format
    res.json(retailer);
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching retailer details:", error); // Debugging log
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT request to update retailer details by user ID
router.put("/:id", async (req, res) => {
  try {
    // Extracting the retailer ID from the request parameters
    const retailerId = req.params.id; // Get the retailer ID from the URL
    // Extracting the updated data from the request body
    const updatedData = req.body; // Get the updated data from the request body

    // Find the retailer and update their details
    const retailer = await Retailer.findOneAndUpdate(
      { user: retailerId }, // Find retailer by user ID
      updatedData, // Update with the new data
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    // If no retailer is found for the update, return a 404 Not Found response
    if (!retailer) {
      console.log("Retailer not found for update"); // Debugging log
      return res.status(404).json({ message: "Retailer not found" });
    }

    // Respond with the updated retailer details in JSON format
    res.json(retailer); // Return the updated retailer details
  } catch (error) {
    // Log any errors that occur during the update process
    console.error("Error updating retailer details:", error); // Debugging log
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
