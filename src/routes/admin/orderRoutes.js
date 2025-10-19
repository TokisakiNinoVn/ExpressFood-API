const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

// router.get('/', protect, orderController.getAllOrders);
// router.get('/:id', protect, orderController.getOrderById);
// router.post('/', protect, orderController.createOrder);
router.put('/:id/status', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;


