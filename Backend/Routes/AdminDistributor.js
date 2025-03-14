// Importing the express library to create a router
const express = require("express");
// Importing the Distributor model to interact with distributor data
const Distributor = require("../Models/Distributor"); // Adjust the path as necessary
// Creating a new router instance
const router = express.Router();

// GET distributor details by user ID
router.get("/:id", async (req, res) => {
  try {
    // Extracting the distributor ID from the request parameters
    const distributorId = req.params.id; // This should be the user ID
    console.log(`Received request for distributor ID: ${distributorId}`); // Debugging log

    // Fetching distributor details from the database using the user ID
    const distributor = await Distributor.findOne({ user: distributorId }); // Fetch distributor details
    console.log(`Fetched distributor: ${JSON.stringify(distributor)}`); // Debugging log

    // If no distributor is found, return a 404 Not Found response
    if (!distributor) {
      console.log("Distributor not found"); // Debugging log
      return res.status(404).json({ message: "Distributor not found" });
    }

    // Respond with the distributor details in JSON format
    res.json(distributor);
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching distributor details:", error); // Debugging log
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT request to update distributor details by user ID
router.put("/:id", async (req, res) => {
  try {
    // Extracting the distributor ID from the request parameters
    const distributorId = req.params.id; // Get the distributor ID from the URL
    // Extracting the updated data from the request body
    const updatedData = req.body; // Get the updated data from the request body

    // Find the distributor and update their details
    const distributor = await Distributor.findOneAndUpdate(
      { user: distributorId }, // Find distributor by user ID
      updatedData, // Update with the new data
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    // If no distributor is found for the update, return a 404 Not Found response
    if (!distributor) {
      console.log("Distributor not found for update"); // Debugging log
      return res.status(404).json({ message: "Distributor not found" });
    }

    // Respond with the updated distributor details in JSON format
    res.json(distributor); // Return the updated distributor details
  } catch (error) {
    // Log any errors that occur during the update process
    console.error("Error updating distributor details:", error); // Debugging log
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
