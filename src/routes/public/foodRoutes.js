const express = require('express');
const router = express.Router();
const foodController = require('../../controllers/foodController');

router.get('/', foodController.getAllFoods);
router.get('/:id', foodController.getFoodById);

module.exports = router;


