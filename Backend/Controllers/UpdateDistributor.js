//Profile Updation of Distributor
// Importing the Distributor model to interact with the distributor data
const Distributor = require("../Models/Distributor");

// ✅ Function to get Distributor Profile by User ID
const getDistributorProfile = async (req, res) => {
  try {
    // Extracting userId from the route parameters
    const { userId } = req.params;

    // Finding the distributor associated with the provided userId
    const distributor = await Distributor.findOne({ user: userId });

    // If no distributor is found, return a 404 Not Found response
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }

    // Respond with the distributor profile in JSON format
    res.json(distributor);
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error response
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Function to update Distributor Profile
const updateDistributorProfile = async (req, res) => {
  try {
    // Extracting userId from the route parameters
    const { userId } = req.params;

    // Finding the distributor associated with the provided userId
    let distributor = await Distributor.findOne({ user: userId });

    // If no distributor is found, return a 404 Not Found response
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }

    // Update the distributor object with the new data from the request body
    Object.assign(distributor, req.body);

    // Validate the updated distributor before saving to the database
    const updatedDistributor = await distributor.save();

    // Respond with the updated distributor profile in JSON format
    res.json(updatedDistributor);
  } catch (error) {
    // Log the error details for debugging purposes
    console.error("Update Error:", error);
    // If an error occurs during the update, return a 500 Internal Server Error response
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Exporting the functions for use in other parts of the application
module.exports = { getDistributorProfile, updateDistributorProfile };
