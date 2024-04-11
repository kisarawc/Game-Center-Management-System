// eventRoutes.js
const express = require('express');
const router = express.Router();
const gameController = require('../../controllers/Saniru/gameController');

router.get('/', gameController.getAllGames);
router.post('/', gameController.createEvent);
router.delete('/:eventId', gameController.deleteEvent);
router.put('/:eventId', gameController.updateEvent);

module.exports = router;
