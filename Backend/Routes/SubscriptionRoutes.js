const express = require("express");
// Creating a new router instance
const router = express.Router();
// Importing the User model to interact with user data
const UserModel = require("../Models/user"); // Adjust the path as necessary

// Route to update the subscription for a user
router.put("/update-subscription", async (req, res) => {
  // Extracting userId and subscription data from the request body
  const { userId, subscription } = req.body;

  // Logging the received request details for debugging
  console.log("Received request to update subscription for userId:", userId);
  console.log("Received subscription data:", subscription);

  try {
    // Fetching the user from the database using the provided userId
    const user = await UserModel.findById(userId);
    // If the user is not found, return a 404 Not Found response
    if (!user) {
      console.log("User  not found for userId:", userId);
      return res.status(404).json({ message: "User  not found." });
    }

    // Updating the user's subscription with the new data
    user.subscription = subscription; // Update the subscription
    // Saving the updated user data back to the database
    await user.save();

    // Logging the successful update for debugging
    console.log("Subscription updated successfully for userId:", userId);
    // Responding with a success message and the updated user data
    res
      .status(200)
      .json({ message: "Subscription updated successfully.", user });
  } catch (error) {
    // Log any errors that occur during the update process
    console.error("Error updating subscription:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Server error." });
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router; // Ensure you export the router
