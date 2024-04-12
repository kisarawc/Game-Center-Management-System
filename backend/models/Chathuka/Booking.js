const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  date: { type: Date },
  start_time: { type: Date },
  duration: { type: Number }, // Representing duration in minutes
  message_request: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  game_name: { type: String }, 
  status: { type: String },
  num_players: { type: Number }
});

// Virtual field to calculate end time based on start time and duration
bookingSchema.virtual('end_time').get(function() {
  if (this.start_time && this.duration) {
    const endTime = new Date(this.start_time);
    endTime.setMinutes(endTime.getMinutes() + this.duration);
    return endTime;
  }
  return null;
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
