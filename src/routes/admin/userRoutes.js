const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { protect, adminOnly } = require('../../middleware/auth');

router.get('/', protect, adminOnly, userController.getAllUsers);
router.get('/:id', protect, userController.getUserById);
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, adminOnly, userController.deleteUser);

module.exports = router;


