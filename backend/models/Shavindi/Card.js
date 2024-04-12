const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  card_no: { type: Number },
  name: { type: String },
  cvv: { type: Number },
  expire_date: { type: Date },
  card_type: { type: String },
  // user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
