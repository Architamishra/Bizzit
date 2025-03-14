//Product validations
// Importing the Joi library for data validation
const Joi = require("joi");

// Middleware function to validate the product addition request
const addProductValidation = (req, res, next) => {
  // Define the validation schema using Joi
  const schema = Joi.object({
    distributorId: Joi.string().required(), // Distributor ID must be a string and is required
    supplier: Joi.object({
      id: Joi.string().required(), // Supplier ID must be a string and is required
      name: Joi.string().required(), // Supplier name must be a string and is required
      connectionCode: Joi.string().required(), // Supplier connection code must be a string and is required
    }).required(), // Supplier object is required

    product: Joi.object({
      name: Joi.string().required(), // Product name must be a string and is required
      code: Joi.string().required(), // Product code must be a string and is required
      category: Joi.string().required(), // Product category must be a string and is required
      description: Joi.string().required(), // Product description must be a string and is required
    }).required(), // Product object is required

    variants: Joi.array() // Variants must be an array
      .items(
        Joi.object({
          attributes: Joi.object({
            Volume: Joi.string(), // Volume attribute is optional
            Color: Joi.string(), // Color attribute is optional
            Weight: Joi.string(), // Weight attribute is optional
            Size: Joi.string(), // Size attribute is optional
          }).required(), // Attributes object is required

          pricing: Joi.object({
            buyPriceWithoutTax: Joi.number().required(), // Buy price without tax must be a number and is required
            buyCgst: Joi.number().required(), // Buy CGST must be a number and is required
            buySgst: Joi.number().required(), // Buy SGST must be a number and is required
            totalBuyPriceWithTax: Joi.number().required(), // Total buy price with tax must be a number and is required
            retailPriceWithoutTax: Joi.number().required(), // Retail price without tax must be a number and is required
            retailCgst: Joi.number().required(), // Retail CGST must be a number and is required
            retailSgst: Joi.number().required(), // Retail SGST must be a number and is required
            totalRetailPriceWithTax: Joi.number().required(), // Total retail price with tax must be a number and is required
            mrp: Joi.number().required(), // MRP must be a number and is required
          }).required(), // Pricing object is required

          stock: Joi.object({
            unitsPerPackage: Joi.number().required(), // Units per package must be a number and is required
            stocksInPackage: Joi.number().required(), // Stocks in package must be a number and is required
            leftoverUnits: Joi.number().required(), // Leftover units must be a number and is required
            totalAvailableUnits: Joi.number().required(), // Total available units must be a number and is required
            returnQuantity: Joi.number().required(), // Return quantity must be a number and is required
            reorderLevel: Joi.number().required(), // Reorder level must be a number and is required
          }).required(), // Stock object is required
        })
      )
      .required(), // Variants array is required

    packagingType: Joi.string().required(), // Packaging type must be a string and is required
    unitsPerPackage: Joi.number().required(), // Units per package must be a number and is required
    stocksInPackage: Joi.number().required(), // Stocks in package must be a number and is required
    leftoverUnits: Joi.number().required(), // Leftover units must be a number and is required
    totalAvailableUnits: Joi.number().required(), // Total available units must be a number and is required
    returnQuantity: Joi.number().required(), // Return quantity must be a number and is required
    reorderLevel: Joi.number().required(), // Reorder level must be a number and is required
  });

  // Validate the request body against the defined schema
  const { error } = schema.validate(req.body);

  // If validation fails, return a 400 Bad Request response with the error message
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // If validation passes, proceed to the next middleware
  next();
};

// Exporting the validation middleware for use in other parts of the application
module.exports = addProductValidation;
