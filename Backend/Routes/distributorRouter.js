const express = require("express");
const { getDistributorById } = require("../Controllers/disController");

const router = express.Router();

router.get("/:distributorId", getDistributorById);

module.exports = router;
