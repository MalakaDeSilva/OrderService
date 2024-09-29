const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Define routes for order management
router.post("/orders", orderController.createOrder);
router.get("/orders/:orderId", orderController.getOrder);
router.put("/orders/:orderId", orderController.updateOrder);
router.delete("/orders/:orderId", orderController.deleteOrder);

module.exports = router;
