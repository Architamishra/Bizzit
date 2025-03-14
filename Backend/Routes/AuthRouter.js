const express = require("express");
// Importing the registerUser  function from the AuthController
const { registerUser } = require("../Controllers/AuthController");

// Creating a new router instance
const router = express.Router();

// Define the route for user registration
// This route handles POST requests to the /register endpoint
router.post("/register", registerUser); // When a POST request is made to /register, the registerUser  function is called

// Exporting the router to be used in other parts of the application
module.exports = router;
