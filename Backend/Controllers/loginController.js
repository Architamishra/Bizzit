//For Login of distributor and retailer
// Importing required modules
const UserModel = require("../Models/user"); // User model to interact with the user database
const bcrypt = require("bcryptjs"); // Library for hashing and comparing passwords
const jwt = require("jsonwebtoken"); // Library for creating JSON Web Tokens
require("dotenv").config(); // Load environment variables from .env file

// Function to log in a user
const loginUser = async (req, res) => {
  try {
    // Destructuring email and password from the request body
    const { email, password } = req.body;

    // Finding the user in the database by email
    const user = await UserModel.findOne({ email });

    // If the user is not found, return an error message
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    // Comparing the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    // If the passwords do not match, return an error message
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password." });

    // *Check Subscription Expiry*
    const today = new Date(); // Get the current date
    // Check if the user's subscription has expired
    if (new Date(user.subscription.endDate) < today) {
      user.subscription.status = "expired"; // Update subscription status to expired
      await user.save(); // Save the updated user information
      return res
        .status(403) // Forbidden status
        .json({ message: "Subscription expired. Please renew your plan." });
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role }, // Payload containing user information
      process.env.JWT_SECRET || "default_secret", // Secret key for signing the token
      { expiresIn: "1h" } // Token expiration time
    );

    // Respond with a success message, the generated token, and user information
    res.status(200).json({
      message: "Login successful",
      token, // The generated JWT token
      user: {
        userId: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    // Log any errors that occur during the login process
    console.error("Login Error:", error.message);
    // Respond with a 500 Internal Server Error status and error message
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Exporting the loginUser  function for use in other parts of the application
module.exports = { loginUser };
