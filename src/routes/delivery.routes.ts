import express from "express";
const router = express.Router();

import deliveryController from "../controllers/delivery.controller";

// Get his/her orders to be delivered
router.get("/", deliveryController.viewOrders);

// Get specific Order
router.get("/:OrderId", deliveryController.viewSpecificOrders);

// Order Delivered by Delivery Person
router.post("/:orderId", deliveryController.orderDelivered);

// Make delivery person unavailable,available
router.put("/", deliveryController.changeStatus);

export default router;
