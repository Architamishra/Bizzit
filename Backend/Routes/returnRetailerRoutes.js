const express = require("express");
// Importing the Return model to interact with return request data
const Return = require("../Models/ReturnModel");

// Creating a new router instance
const router = express.Router();

// Route to create a return request
router.post("/", async (req, res) => {
  try {
    // Destructuring the request body to extract necessary fields
    const { productId, productName, orderDate, reason, returnDate } = req.body;

    // Validating that all required fields are provided
    if (!productId || !productName || !orderDate || !reason || !returnDate) {
      // If any field is missing, return a 400 Bad Request response
      return res.status(400).json({ message: "All fields are required." });
    }

    // Creating a new return request object
    const newReturn = new Return({
      productId,
      productName,
      orderDate,
      reason,
      returnDate,
    });

    // Saving the new return request to the database
    await newReturn.save();
    // Responding with a success message
    res.status(201).json({ message: "Return request submitted successfully." });
  } catch (error) {
    // Log any errors that occur during the creation of the return request
    console.error("Return request error:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

// Route to get all return requests
router.get("/", async (req, res) => {
  try {
    // Fetching all return requests from the database
    const returnRequests = await Return.find();
    // Responding with the list of return requests in JSON format
    res.status(200).json(returnRequests);
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching returns:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Server error." });
  }
});

// Route to update the return status (acceptance/completion)
router.put("/:id", async (req, res) => {
  try {
    // Destructuring the request body to extract acceptance and completion status
    const { acceptanceStatus, completionStatus } = req.body;

    // Finding the return request by ID and updating its status
    const updatedReturn = await Return.findByIdAndUpdate(
      req.params.id, // ID from the request parameters
      { acceptanceStatus, completionStatus }, // Fields to update
      { new: true } // Return the updated document
    );

    // If no return request is found, return a 404 Not Found response
    if (!updatedReturn) {
      return res.status(404).json({ message: "Return request not found." });
    }

    // Responding with a success message and the updated return request
    res.status(200).json({ message: "Return status updated.", updatedReturn });
  } catch (error) {
    // Log any errors that occur during the update process
    console.error("Error updating return status:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Server error." });
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
