//For adding and handling supplir
// Importing the express library to create a router
const express = require("express");
const router = express.Router(); // Creating a new router instance

// Importing the controller that contains the logic for handling supplier-related requests
const addSupplierController = require("../Controllers/AddSupplierController"); // Ensure this path is correct

// Define the routes for supplier-related operations

// Route to create a new supplier
router.post("/", addSupplierController.createSupplier);

// Route to get all suppliers
router.get("/", addSupplierController.getSuppliers);

// Route to get a specific supplier by ID
router.get("/:id", addSupplierController.getSupplierById);

// Route to update a supplier's information by ID
router.put("/:id", addSupplierController.updateSupplier);

// Route to delete a supplier by ID
router.delete("/:id", addSupplierController.deleteSupplier);

// Route to update the dealership status of a product associated with a supplier
router.put(
  "/products/:productId/status",
  addSupplierController.updateDealershipStatus
);

// Route to get active products for a specific supplier by supplier ID
router.get(
  "/:supplierId/active-products",
  addSupplierController.getActiveProductsBySupplier
);

// Exporting the router to be used in other parts of the application
module.exports = router;
