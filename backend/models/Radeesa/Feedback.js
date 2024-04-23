const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  comment: { type: String },
  rating: { type: Number },
  image_path: { type: String },
  date: { type: Date },
  // admin_feedback: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  game_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
