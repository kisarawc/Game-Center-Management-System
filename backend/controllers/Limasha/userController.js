const Mongoose = require('mongoose');
const User = require('../../models/Limasha/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all the users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      data: {
        users
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

//create a user
exports.createUser = async (req, res) => {
  try {
    const { name, username, email, password, joinDate, gender} = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ name, username, email, password: hashedPassword, joinDate, gender
    });

    const savedUser = await newUser.save();

    // Return the response
    res.status(201).json({
      status: 'success',
      data: {
        user: savedUser
      }
    });
  }
  catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};


//delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } 
  catch (error) {
    console.error('Error deleting the user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//login
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the user-provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If the passwords match, return success
    return res.status(200).json({ message: "Success login" });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// getUserByID
exports.getUserById = async (req, res) => {

  const {userId} = req.params;

      //check for valid id
      if (!Mongoose.Types.ObjectId.isValid(userId)){
          return res.status(404).json({error:'invalid id'})
      }
  
  const user = await User.findById(userId)

      //if User not found
      if(!user){
          return res.status(400).json({error:'User not found'})
      }
  
      res.status(200).json(user)
  }

//updateUser
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(updatedUser);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

