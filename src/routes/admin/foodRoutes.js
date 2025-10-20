const express = require('express');
const router = express.Router();
const foodController = require('../../controllers/foodController');
const { protect, adminOnly } = require('../../middleware/auth');

router.get('/', foodController.getAllFoods);
router.get('/:id', foodController.getFoodById);
router.post('/', protect, adminOnly, foodController.createFood);
router.put('/:id', protect, adminOnly, foodController.updateFood);
router.delete('/:id', protect, adminOnly, foodController.deleteFood);

module.exports = router;


