const express = require('express');
const router = express.Router();
const feedbackController = require('../../controllers/Radeesa/feedbackController');

router.get('/', feedbackController.getAllFeedback);
router.post('/createFeedback', feedbackController.createFeedback);
router.delete('/deleteFeedback/:feedbackId', feedbackController.deleteFeedback);
router.put('/updateFeedback/:feedbackId', feedbackController.updateFeedback);

module.exports = router;
