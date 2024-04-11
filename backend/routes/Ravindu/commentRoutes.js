// commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/Ravindu/commentController');

router.get('/:eventId/comments', commentController.getCommentsByEventId);
router.post('/:eventId/comments', commentController.addComment);

module.exports = router;
