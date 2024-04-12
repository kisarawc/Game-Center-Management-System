const User = require('../../models/Limasha/User');
const bcrypt = require('bcryptjs');
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
    const { name, username, email, password, joinDate, gender, role } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ name, username, email, password: hashedPassword, joinDate, gender, role 
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


//update user
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

  // Test email and password received from the frontend
  console.log(email, password);

  try {
    const user = await User.findOne({ Email: email });

    // Test if user is found
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Test if user passwords are correctly matched
    console.log(password);
    console.log(user.Password);

    // Check if password is correct
    if (password !== user.Password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    } else {
      // Login successful
      console.log('Login success');
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      // Test token generation
      console.log(token);
      // Send the token
      return res.status(200).json({ token, userId: user._id });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

