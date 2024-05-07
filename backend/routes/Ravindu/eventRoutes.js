// eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../../controllers/Ravindu/eventController');

router.get('/', eventController.getAllGames);
router.post('/', eventController.createGame);
router.delete('/:eventId', eventController.deleteGame);
router.put('/:eventId', eventController.updateGame);

module.exports = router;
