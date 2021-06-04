import express from "express";
const router = express.Router();

import deliveryController from "../controllers/delivery.controller";

// Get his/her orders to be delivered
router.get("/:DPId", deliveryController.viewOrders);

// Get specific Order
router.get("/:DPId/:OrderId", deliveryController.viewSpecificOrders);

router.post("/address/:DPId", deliveryController.addAddress);

// Order Delivered by Delivery Person
router.post("/order/:orderId", deliveryController.orderDelivered);

// Make delivery person unavailable,available
router.put("/:DPId", deliveryController.changeStatus);

export default router;
