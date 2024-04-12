const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Limasha/userController');

<<<<<<< Updated upstream
router.get('/', userController.getAllUsers);
=======
router.get('/getAllUsers', userController.getAllUsers);
>>>>>>> Stashed changes
router.post('/createUser', userController.createUser);
router.put('/updateUser/:userId', userController.updateUser);
router.delete('/deleteUser/:userId', userController.deleteUser);
router.post('/login', userController.userLogin);

module.exports = router;
