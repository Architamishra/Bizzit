//For Registration of distributor and retailer
// Importing required modules
const bcrypt = require("bcryptjs"); // For hashing passwords
const Distributor = require("../Models/Distributor"); // Distributor model
const Retailer = require("../Models/Retailer"); // Retailer model
const UserModel = require("../Models/user"); // User model
const {
  retailerValidation, // Validation middleware for retailers
  distributorValidation, // Validation middleware for distributors
} = require("../Middlewares/AuthValidation");

// Function to register a new user
const registerUser = async (req, res) => {
  try {
    // Log the incoming request data for debugging purposes
    console.log("Incoming Request Data:", req.body);

    // Destructure the required fields from the request body
    let { role, email, password, fullname, upiId } = req.body; // Add UPI ID

    // Check if the role is provided
    if (!role) {
      return res.status(400).json({ message: "Role is required." });
    }

    // Convert the role to lowercase for consistency
    role = role.toLowerCase();
    console.log("Role received:", role);

    // Validate the user role and request body based on the role
    let validationResult;
    if (role === "distributor") {
      validationResult = distributorValidation.validate(req.body);
    } else if (role === "retailer") {
      validationResult = retailerValidation.validate(req.body);
    } else {
      return res.status(400).json({ message: "Invalid role specified." });
    }

    // If validation fails, return the error message
    if (validationResult.error) {
      console.log(
        "Validation Error:",
        validationResult.error.details[0].message
      );
      return res
        .status(400)
        .json({ message: validationResult.error.details[0].message });
    }

    // Check if a user with the provided email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user entry in the Users collection
    const newUser = new UserModel({
      fullname,
      email,
      role,
      password: hashedPassword, // Store the hashed password
      subscription: {
        status: "Trial", // Initial subscription status
        type: "Trial", // Subscription type
        startDate: new Date(), // Start date of the subscription
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)), // End date set to 30 days from now
        nextBillingDate: null, // No billing date for trial
      },
    });

    // Save the user and get the generated ID
    const savedUser = await newUser.save();

    // Prepare data for Distributor or Retailer based on the role
    let newRoleUser;
    if (role === "distributor") {
      newRoleUser = new Distributor({
        user: savedUser._id, // Link to the user ID
        userId: savedUser._id, // Store user ID
        fullname: req.body.fullname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        workAddress: req.body.workAddress,
        role: req.body.role,
        gender: req.body.gender,
        password: hashedPassword, // Store hashed password
        business: req.body.business,
        businessDetails: req.body.businessDetails,
        taxDetails: req.body.taxDetails,
        bankDetails: req.body.bankDetails,
        upiId, // Save UPI ID in Distributor model if needed
      });
    } else if (role === "retailer") {
      newRoleUser = new Retailer({
        user: savedUser._id, // Link to the user ID
        userId: savedUser._id, // Store user ID
        fullname: req.body.fullname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        workAddress: req.body.workAddress,
        role: req.body.role,
        gender: req.body.gender,
        password: hashedPassword, // Store hashed password
        business: req.body.business,
        businessDetails: req.body.businessDetails,
        taxDetails: req.body.taxDetails,
        bankDetails: req.body.bankDetails,
        upiId, // Save UPI ID in Retailer model if needed
      });
    }

    // Save the distributor or retailer details to the database
    await newRoleUser.save();

    // Respond with a success message and the user ID
    res.status(201).json({
      message: "User  registered successfully.",
      user: savedUser._id, // Return the user ID
    });
  } catch (error) {
    // Log any server errors and respond with an error message
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Export the registerUser  function for use in other parts of the application
module.exports = { registerUser };
