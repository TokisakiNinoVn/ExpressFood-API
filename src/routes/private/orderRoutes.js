const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');
const { protect, adminOnly } = require('../../middleware/auth');

router.get('/', protect, orderController.getAllOrders);
router.get('/:id', protect, orderController.getOrderById);
router.post('/', protect, orderController.createOrder);
// router.put('/:id/status', protect, adminOnly, orderController.updateOrderStatus);
// router.delete('/:id', protect, adminOnly, orderController.deleteOrder);

module.exports = router;


