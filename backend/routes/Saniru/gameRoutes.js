// gameRoutes.js
const express = require('express');
const router = express.Router();
const gameController = require('../../controllers/Saniru/gameController');

router.get('/', gameController.getAllGames);
router.post('/createGame', gameController.createGame);
router.delete('/deleteGame/:gameId', gameController.deleteGame);
router.put('/updateGame/:gameId', gameController.updateGame);
router.get('/:gameId', gameController.getGameById);

module.exports = router;
