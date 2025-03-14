//For Inventory updation
// Importing the necessary models to interact with the database
const ProductInventory = require("../Models/ProductInventory"); // Model for product inventory
const Stock = require("../Models/StockModel"); // Model for stock items

// Function to update an inventory item
const updateInventoryItem = async (req, res) => {
  // Extracting the inventory item ID from the request parameters
  const { id } = req.params;

  try {
    // Log the ID of the item being updated and the new data
    console.log("Updating inventory item with ID:", id, "Data:", req.body);

    // Update the inventory item in the database with the new data
    const updatedItem = await ProductInventory.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // If the item is not found, return a 404 Not Found response
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Prepare stock updates for each variant in the updated inventory item
    const stockUpdates = updatedItem.variants.map((variant) => {
      return {
        variantId: variant._id, // ID of the variant
        attributes: {
          Volume: variant.attributes.Volume, // Volume attribute of the variant
          Color: variant.attributes.Color, // Color attribute of the variant
          Weight: variant.attributes.Weight, // Weight attribute of the variant
          Size: variant.attributes.Size, // Size attribute of the variant
        },
        pricing: {
          cgst: variant.pricing.retailCgst, // CGST pricing for the variant
          sgst: variant.pricing.retailSgst, // SGST pricing for the variant
          retailPriceWithTax: variant.pricing.totalRetailPriceWithTax, // Retail price with tax
        },
      };
    });

    // Update the stock for each variant in the stock model
    for (const stockUpdate of stockUpdates) {
      const result = await Stock.updateOne(
        { productId: id, "variants.variantId": stockUpdate.variantId }, // Find the stock item by product ID and variant ID
        {
          $set: {
            "variants.$.attributes": stockUpdate.attributes, // Update the attributes of the variant
            "variants.$.pricing.cgst": stockUpdate.pricing.cgst, // Update CGST pricing
            "variants.$.pricing.sgst": stockUpdate.pricing.sgst, // Update SGST pricing
            "variants.$.pricing.retailPriceWithTax":
              stockUpdate.pricing.retailPriceWithTax, // Update retail price with tax
          },
        }
      );

      // Log the result of the update operation for each variant
      console.log(
        `Update result for variant ID ${stockUpdate.variantId}:`,
        result
      );
    }

    // Respond with the updated inventory item
    res.json(updatedItem);
  } catch (error) {
    // Log any errors that occur during the update process
    console.error("Error updating inventory item:", error);
    // Return a 500 Internal Server Error response with the error message
    res.status(500).json({ message: error.message });
  }
};

// Exporting the updateInventoryItem function for use in other parts of the application
module.exports = {
  updateInventoryItem,
};
