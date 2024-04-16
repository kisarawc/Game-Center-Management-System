const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true  },
  image_path: { type: String, required: true  },
  availability: { type: Boolean, required: true  },
  platform: { type: String, required: true  },
  hourly_rate: { type: Number, required: true  },
  game_rating: { type: Number, required: true  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
