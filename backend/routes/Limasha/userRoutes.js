const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Limasha/userController');

router.get('/', userController.getAllUsers);
router.post('/createUser', userController.createUser);
router.delete('/deleteUser/:userId', userController.deleteUser);
router.post('/login', userController.userLogin);
router.get('/:userId', userController.getUserById);
router.patch('/updateUser/:userId', userController.updateUser);
router.post('/sendOTP', userController.sendOTP);

module.exports = router;
