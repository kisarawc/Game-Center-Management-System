const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Limasha/userController');

router.get('/', userController.getAllUsers);
router.post('/createUser', userController.createUser);
router.put('/updateUser/:userId', userController.updateUser);
router.delete('/deleteUser/:userId', userController.deleteUser);
router.post('/login', userController.userLogin);
router.get('/:userId', userController.getUserById)

module.exports = router;
