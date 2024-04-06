const mongoose = require('mongoose');

const userPhoneSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  phone: { type: String }
});

const UserPhone = mongoose.model('UserPhone', userPhoneSchema);

module.exports = UserPhone;
