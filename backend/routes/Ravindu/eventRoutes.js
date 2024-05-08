// eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../../controllers/Ravindu/eventController');

router.get('/', eventController.getAllEvents);
router.post('/', eventController.createEvent);
router.delete('/:eventId', eventController.deleteEvent);
router.put('/:eventId', eventController.updateEvent);


module.exports = router;
