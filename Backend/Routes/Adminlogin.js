const express = require("express");
// Importing the loginUser  function from the loginController
const { loginUser } = require("../Controllers/loginController");

// Creating a new router instance
const router = express.Router();

// Define the login route for admin
// This route handles POST requests to the root of this router (e.g., /login/admin)
router.post("/", loginUser); // Ensure this is set to '/' to match the /login/admin endpoint

// Exporting the router to be used in other parts of the application
module.exports = router;
