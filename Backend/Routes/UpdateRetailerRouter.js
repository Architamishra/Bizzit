const express = require("express");
const router = express.Router();
const {
  getRetailerProfile,
  updateRetailerProfile,
} = require("../Controllers/UpdateRetailer");

router.get("/profile/:userId", getRetailerProfile);
router.put("/profile/:userId", updateRetailerProfile);

module.exports = router;
