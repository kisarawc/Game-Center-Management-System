const express = require('express');
const router = express.Router();
const cardController = require('../../controllers/Shavindi/cardController');

router.get('/', cardController.getCardDetails);
router.delete('/', cardController.deleteCard);
router.patch('/', cardController.updateCard);
router.post("/",cardController.createCardDetails)
module.exports = router;

