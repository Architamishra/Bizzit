const express = require("express");
const {
  getProductsByDistributor,
} = require("../Controllers/productController");

const router = express.Router();

// Route for fetching products by distributorId
router.get("/:distributorId", getProductsByDistributor);

module.exports = router;
