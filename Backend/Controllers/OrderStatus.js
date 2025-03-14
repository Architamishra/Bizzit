//For viewing Order placed by retailer
// controllers/orderController.js

// Importing the Order and Stock models to interact with the database
const Order = require("../Models/Order"); // Model for orders
const Stock = require("../Models/StockModel"); // Model for stock items

// Update order acceptance status
const updateAcceptanceStatus = async (req, res) => {
  const { orderId } = req.params; // Extracting orderId from request parameters
  const { status } = req.body; // Extracting new status from request body

  console.log("🔄 Received request to update acceptance status");
  console.log("📌 Order ID:", orderId);
  console.log("📌 New Status:", status);

  try {
    // Find the order by orderId
    const order = await Order.findById(orderId);
    if (!order) {
      console.log("❌ Order not found");
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("✅ Order Object:", order);

    // If the status is "Accepted", check for stock updates
    if (status === "Accepted") {
      // Ensure the order has a variantId
      if (!order.variantId) {
        console.log("❌ Variant ID missing.");
        return res
          .status(400)
          .json({ message: "Variant ID is required to update stock." });
      }

      console.log(
        "🔍 Searching for stock item with productId:",
        order.productId
      );

      // Find the stock item associated with the order
      const stockItem = await Stock.findOne({
        _id: order.productId,
        distributorId: order.distributorId,
      });

      if (!stockItem) {
        console.log("❌ Stock item not found");
        return res.status(404).json({ message: "Stock item not found" });
      }

      console.log("✅ Found Stock Item, Checking for Variant...");

      // Find the variant in the stock item
      const variant = stockItem.variants.find(
        (v) => v._id.toString() === order.variantId.toString()
      );

      if (!variant) {
        console.log("❌ Variant not found in stock item");
        return res
          .status(404)
          .json({ message: "Variant not found in stock item" });
      }

      console.log("✅ Variant Found:", variant);

      // Ensure stock details are present for the variant
      if (!variant.stockDetails) {
        console.log("❌ stockDetails missing in variant");
        return res
          .status(500)
          .json({ message: "Stock details missing for the selected variant" });
      }

      // Calculate total units to deduct from stock
      const orderedQuantity = order.quantity || 0; // Get ordered quantity
      const unitsPerPackage = variant.stockDetails.unitsPerPackage || 1; // Get units per package
      const totalUnitsToDeduct = orderedQuantity * unitsPerPackage; // Calculate total units to deduct

      console.log("📦 Ordered Quantity:", orderedQuantity);
      console.log("📦 Units per Package:", unitsPerPackage);
      console.log("📦 Total Units to Deduct:", totalUnitsToDeduct);
      console.log(
        "📦 Available Stock Before Deduction:",
        variant.stockDetails.totalAvailableUnits
      );

      // Check if enough stock is available
      if (variant.stockDetails.totalAvailableUnits >= totalUnitsToDeduct) {
        // Deduct stock
        variant.stockDetails.totalAvailableUnits -= totalUnitsToDeduct; // Update available units
        variant.stockDetails.stocksInPackage -= orderedQuantity; // Update stocks in package

        console.log("✅ Updated Stock Details:", variant.stockDetails);

        // Save updated stock item
        await stockItem.save();
        console.log("✅ Stock Updated Successfully!");
      } else {
        console.log("❌ Not Enough Stock Available!");
        return res.status(400).json({ message: "Not enough stock available" });
      }
    }

    // Update the acceptance status of the order
    order.AcceptanceStatus = status;
    await order.save();

    // Populate the order with product details for the response
    const updatedOrder = await Order.findById(orderId).populate(
      "productId",
      "productName"
    );

    // Respond with the updated order
    res
      .status(200)
      .json({
        message: "Acceptance status updated successfully",
        order: updatedOrder,
      });
  } catch (error) {
    console.error("❌ Error updating acceptance status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update order payment status
const updatePaymentStatus = async (req, res) => {
  const { orderId } = req.params; // Get orderId from the request parameters
  const { status } = req.body; // Expecting { status: "Paid" }

  try {
    // Find the order by orderId
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the payment status
    order.paymentStatus = status; // Update to the new status
    await order.save(); // Save the updated order

    // Populate the order again to include product details
    const updatedOrder = await Order.findById(orderId).populate(
      "productId",
      "productName"
    );

    // Respond with the updated order
    res
      .status(200)
      .json({
        message: "Payment status updated successfully",
        order: updatedOrder,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update order completion status
const updateCompletionStatus = async (req, res) => {
  const { orderId } = req.params; // Get orderId from the request parameters
  const { status } = req.body; // Expecting { status: "Completed" }

  try {
    // Find the order by orderId
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the completion status
    order.completeStatus = status; // Update to the new status
    await order.save(); // Save the updated order

    // Populate the order again to include product details
    const updatedOrder = await Order.findById(orderId).populate(
      "productId",
      "productName"
    );

    // Respond with the updated order
    res
      .status(200)
      .json({
        message: "Completion status updated successfully",
        order: updatedOrder,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update order expected delivery date
const updateExpectedDeliveryDate = async (req, res) => {
  const { orderId } = req.params; // Get orderId from the request parameters
  const { expectedDeliveryDate } = req.body; // Expecting { expectedDeliveryDate: "YYYY-MM-DD" }

  try {
    // Find the order by orderId
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the expected delivery date
    order.expectedDeliveryDate = expectedDeliveryDate; // Update to the new date
    await order.save(); // Save the updated order

    // Populate the order again to include product details
    const updatedOrder = await Order.findById(orderId).populate(
      "productId",
      "productName"
    );

    // Respond with the updated order
    res
      .status(200)
      .json({
        message: "Expected delivery date updated successfully",
        order: updatedOrder,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Exporting the functions for use in other parts of the application
module.exports = {
  updateAcceptanceStatus,
  updatePaymentStatus,
  updateCompletionStatus,
  updateExpectedDeliveryDate, // Export the new function
};
