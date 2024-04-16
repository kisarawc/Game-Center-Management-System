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
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.deleteGame = async (req, res) => {
  try {
    const games = await Game.findByIdAndDelete(req.params.gameId);
    if (!games) {
      res.status(404).json({
        status: 'fail',
        message: 'Booking not found'
      });
      return;
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.updateGame = async (req, res) => {
  const { gameId } = req.params;
  try {
    const updatedGame = await Game.findByIdAndUpdate(gameId, req.body, { new: true });
    res.status(200).json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
