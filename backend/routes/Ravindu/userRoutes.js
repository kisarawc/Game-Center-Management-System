// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Ravindu/userController');

// GET user by ID
router.get('/:userId', userController.getUserById);

module.exports = router;
