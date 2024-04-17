const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  date: { type: Date },
  start_time: { type: Date },
  end_time: { type: Date },
  duration: { type: Number }, // Representing duration in minutes
  message_request: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  game_name: { type: String }, 
  status: { type: String },
  num_players: { type: Number }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
