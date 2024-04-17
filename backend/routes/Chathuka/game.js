const express = require('express');
const bookingController = require('../../controllers/Chathuka/game');
const Game = require('../../controllers/Chathuka/game');

const router = express.Router();

router.route('/')
.get(Game.getAllGames)

router.route('/')
.post(Game.createGame)

router.get('/names', Game.getGamesDropdown);

module.exports = router;