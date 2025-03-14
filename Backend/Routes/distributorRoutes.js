// routes/distributorRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllDistributors,
  addDistributor,
} = require("../Controllers/distributorController");

router.get("/", getAllDistributors); // ✅ Get all distributors
router.post("/", addDistributor); // ✅ Add a new distributor (for testing)

module.exports = router;
