// routes/OrderStatus.js
const express = require("express");
const {
  updateAcceptanceStatus,
  updatePaymentStatus,
  updateCompletionStatus,
  updateExpectedDeliveryDate,
} = require("../Controllers/OrderStatus");

const router = express.Router();

// Route to update acceptance status
router.put("/updateAcceptanceStatus/:orderId", updateAcceptanceStatus);

router.put("/updatePaymentStatus/:orderId", updatePaymentStatus);

router.put("/updateCompletionStatus/:orderId", updateCompletionStatus);

router.put("/updateExpectedDeliveryDate/:orderId", updateExpectedDeliveryDate);

//router.put('/rejectOrder/:orderId', rejectOrder);

module.exports = router;
