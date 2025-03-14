const express = require("express");
const router = express.Router();
const {
  getDistributorProfile,
  updateDistributorProfile,
} = require("../Controllers/UpdateDistributor");

// Get Distributor Profile
router.get("/profile/:userId", getDistributorProfile);

// Update Distributor Profile
router.put("/profile/:userId", updateDistributorProfile);

module.exports = router;
