const express = require('express');
const router = express.Router();
const cardController = require('../../controllers/Shavindi/cardController');

router.get('/', cardController.getCardDetails);
router.delete('/delete/:cardId', cardController.deleteCard);
router.put('/update/:cardId', cardController.updateCard);
router.post("/create",cardController.createCardDetails);
router.get('/getcardDetail/:userId', cardController.getCardDetailsByUserId);

module.exports = router;

