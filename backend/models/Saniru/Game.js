const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String },
  image_path: { type: String },
  availability: { type: Boolean },
  platform: { type: String },
  hourly_rate: { type: Number },
  game_rating: { type: Number },
  description: {type :String }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;