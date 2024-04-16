const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
  name: { 
    type: String, required: true
  },
  username: { 
    type: String, required: true, unique: true 
  },
  email: { 
    type: String, required: true, unique: true 
  },
  password: { 
    type: String, required: true 
  },
  joinDate: { 
    type: Date 
  },
  gender: { 
    type: String, enum: ['Male', 'Female', 'Other'] 
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;