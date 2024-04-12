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

// //login 
// exports.userLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

//     return res.status(200).json({ token, userId: user._id });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };


// //login
// exports.userLogin = async (req, res) => {
//   const { email, password } = req.body;

//   // Basic validation (improve based on your requirements)
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required.' });
//   }

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email .' });
//     }

//     // Compare password hashes (using bcrypt)
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid password.' });
//     }

//     // Login successful (replace with appropriate token generation and handling)
//     const token = 'your_jwt_token'; // Replace with actual token generation logic

//     res.json({
//       message: 'Login successful!',
//       token,
//       user: { // Send relevant user data after successful login
//         userId: user._id,
//         email: user.email,
//         // Other user data you want to send to the frontend
//       }
//     });
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ message: 'Internal server error.' }); // Send generic error to user
//   }
// };

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
    res.json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};