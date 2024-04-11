const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Limasha/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.post('/login', userController.userLogin);

module.exports = router;
