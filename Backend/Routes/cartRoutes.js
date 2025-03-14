const express = require("express");

const router = express.Router();
// Importing the Cart model to interact with cart data
const Cart = require("../Models/Cart");

// Route to add an item to the cart
// This route handles POST requests to the root of this router (e.g., /cart)
router.post("/", async (req, res) => {
  try {
    // Destructuring the request body to extract productId, variantId, retailerId, and other data
    const { productId, variantId, retailerId, ...otherData } = req.body;

    // Finding the cart item and updating its quantity
    const cartItem = await Cart.findOneAndUpdate(
      { productId, variantId, retailerId }, // Criteria to find the cart item
      { $inc: { quantity: otherData.quantity || 1 } }, // Increment the quantity; default to 1 if not provided
      { upsert: true, new: true } // Create a new item if it doesn't exist, and return the updated item
    );

    // Responding with a success message and the updated cart item
    res.status(201).json({ message: "Item added/updated in cart!", cartItem });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error adding to cart:", error);
    // Return a 500 Internal Server Error response if an error occurs
    res.status(500).json({ message: "Server error!" });
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
