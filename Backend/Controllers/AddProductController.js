// For adding Products in Inventory and Stock
// Importing required modules
const mongoose = require("mongoose");
const ProductInventory = require("../Models/ProductInventory");
const Stock = require("../Models/StockModel");
const { generateCustomId } = require("../utils/idGenerator");

// Function to add a new product and its stock
const add = async (req, res) => {
  try {
    // Log the incoming request data for debugging
    console.log(
      "🔹 Request received with data:",
      JSON.stringify(req.body, null, 2)
    );

    // Generate a unique product ID
    const productId = generateCustomId();
    console.log("Generated Product ID:", productId);

    // Convert distributorId from string to MongoDB ObjectId
    const userObjectId = new mongoose.Types.ObjectId(req.body.distributorId);
    console.log("Converted distributorId to ObjectId:", userObjectId);

    // Create a new product inventory object
    const productInventory = new ProductInventory({
      distributorId: userObjectId,
      supplier: req.body.supplier,
      product: {
        ...req.body.product,
        id: productId, // Assign the generated product ID
      },
      variants: req.body.variants.map((variant) => ({
        ...variant,
        pricing: {
          ...variant.pricing,
          dateAdded: new Date(), // Add the current date to pricing
        },
      })),
    });

    // Log the product inventory object before saving
    console.log("🔹 Saving product inventory:", productInventory);

    // Save the product inventory to the database
    let savedProductInventory = await productInventory.save();
    // Fetch the saved product inventory to ensure it has the latest data
    savedProductInventory = await ProductInventory.findById(
      savedProductInventory._id
    );

    // Log the saved product inventory
    console.log(
      "✅ Saved Product Inventory:",
      JSON.stringify(savedProductInventory, null, 2)
    );

    // Check if variants are saved correctly
    if (!savedProductInventory || !savedProductInventory.variants.length) {
      console.error("❌ Variants are missing after saving!");
      return res
        .status(500)
        .json({ message: "Error: Variants are not saved properly!" });
    }

    // Check for existing stock for the distributor
    console.log("🔹 Checking existing stock for distributorId:", userObjectId);
    const existingStock = await Stock.findOne({
      distributorId: userObjectId,
      productId: savedProductInventory._id,
    });

    // If existing stock is found, update it
    if (existingStock) {
      console.log(" Existing stock found, updating stock...");

      // Add each variant to the existing stock
      savedProductInventory.variants.forEach((variant) => {
        console.log("🔹 Adding variant to stock:", variant);
        existingStock.variants.push({
          variantId: variant._id,
          attributes: variant.attributes,
          stockDetails: {
            unitsPerPackage: variant.stock?.unitsPerPackage || 0,
            stocksInPackage: variant.stock?.stocksInPackage || 0,
            leftoverUnits: variant.stock?.leftoverUnits || 0,
            totalAvailableUnits: variant.stock?.totalAvailableUnits || 0,
            returnQuantity: variant.stock?.returnQuantity || 0,
          },
          cgst: variant.pricing?.retailCgst || 0,
          sgst: variant.pricing?.retailSgst || 0,
          retailPriceWithTax: variant.pricing?.totalRetailPriceWithTax || 0,
        });
      });

      // Update the last updated date and save the stock
      existingStock.lastUpdated = new Date();
      await existingStock.save();
      console.log(" Stock updated successfully!");
    } else {
      // If no existing stock is found, create a new stock entry
      console.log(" No existing stock found, creating new stock entry...");

      const stockEntry = {
        distributorId: userObjectId,
        productId: savedProductInventory._id,
        productName: req.body.product.name,
        packagingType: req.body.packagingType,
        variants: savedProductInventory.variants.map((variant, index) => ({
          variantId: variant._id,
          attributes: variant.attributes,
          stockDetails: {
            unitsPerPackage:
              req.body.variants[index]?.stock?.unitsPerPackage || 0,
            stocksInPackage:
              req.body.variants[index]?.stock?.stocksInPackage || 0,
            leftoverUnits: req.body.variants[index]?.stock?.leftoverUnits || 0,
            totalAvailableUnits:
              req.body.variants[index]?.stock?.totalAvailableUnits || 0,
            returnQuantity:
              req.body.variants[index]?.stock?.returnQuantity || 0,
          },
          pricing: {
            cgst: req.body.variants[index]?.pricing?.retailCgst ?? 0,
            sgst: req.body.variants[index]?.pricing?.retailSgst ?? 0,
            retailPriceWithTax:
              req.body.variants[index]?.pricing?.totalRetailPriceWithTax ?? 0,
          },
        })),
        reorderLevel: req.body.variants[0]?.stock?.reorderLevel || 0,
        lastUpdated: new Date(),
      };

      // Log the new stock entry before creating it
      console.log(
        "🔹 Creating new stock:",
        JSON.stringify(stockEntry, null, 2)
      );
      await Stock.create(stockEntry);
      console.log("✅ New stock entry created successfully!");
    }

    // Respond with success message and saved product inventory
    res.status(201).json({
      message: "Product and stock added successfully!",
      data: {
        productInventory: savedProductInventory,
      },
    });
  } catch (err) {
    // Log any errors that occur during the process
    console.error("❌ Error occurred:", err);
    res.status(500).json({
      message: "An error occurred while adding the product and stock.",
      error: err.message,
    });
  }
};

// Function to get a specific inventory item by ID
const getInventoryItem = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const item = await ProductInventory.findById(id); // Find the inventory item by ID
    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" }); // Handle case where item is not found
    }
    res.json(item); // Respond with the found item
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching inventory item:", error);
    res.status(500).json({ message: error.message });
  }
};

// Export the functions for use in other parts of the application
module.exports = { add, getInventoryItem };
