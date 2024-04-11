const User = require('../../models/Limasha/User');

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

// Create a user
exports.createUser = async (req, res) => {
  try {
    const { name, username, email, password, joinDate, gender, role } = req.body;
    const newUser = new User({ name, username, email, password, joinDate, gender, role });
    const savedUser = await newUser.save();
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
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Temporary: Directly compare the password
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Here, you can skip generating the JWT token and just return user ID
    res.status(200).json({ userId: user._id });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
