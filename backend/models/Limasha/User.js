const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  role: { type: String, enum: ['User', 'Admin'], default: 'User' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
