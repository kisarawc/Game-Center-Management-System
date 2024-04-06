const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: { type: Number },
  time: { type: Date },
  date: { type: Date },
  payment_method: { type: String },
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
