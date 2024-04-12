const express = require('express');
const router = express.Router();
const cardController = require('../../controllers/Shavindi/cardController');

router.get('/getCardDetails/cards', cardController.getCardDetails);
router.delete('/deleteCard/:cardId/cards', cardController.deleteCard);
router.put('/updateCard/:cardId/cards', cardController.updateCard);

module.exports = router;

