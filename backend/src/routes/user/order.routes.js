const express = require('express');
const router = express.Router();
const userAuth = require('../../middleware/userAuth');
const orderController = require('../../controllers/user/order.controller');

// User Orders routes
router.post('/', userAuth, orderController.placeOrder);
// router.get('/', userAuth, orderController.getUserOrders);
// router.get('/:orderId', userAuth, orderController.getOrderDetails);
// router.post('/:orderId/cancel', userAuth, orderController.cancelOrder);
// router.post('/:orderId/return', userAuth, orderController.returnOrder);

module.exports = router;