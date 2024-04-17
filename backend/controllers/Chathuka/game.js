const Game = require('../../models/Saniru/Game');
exports.createGame = async (req, res) => {
    try {
      const newGame = await Game.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          game: newGame
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };

  exports.getAllGames = async (req, res) => {
    try {
      const games = await Game.find();
      res.status(200).json({
        status: 'success',
        data: {
          games
        }
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  };

  exports.getGamesDropdown = async (req, res) => {
    try {
      const games = await Game.find({}, 'name'); // Fetch only the 'name' field of all games
      res.json(games); // Send the array of game names as JSON response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };