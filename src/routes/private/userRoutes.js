const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { protect, adminOnly } = require('../../middleware/auth');

router.get('/', userController.getAllUsers);
router.get('/:id', protect, userController.getUserById);
router.put('/:id', protect, userController.updateUser);
router.put('/update/:id', protect, userController.updateInforByUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;


