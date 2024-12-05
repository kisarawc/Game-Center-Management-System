const Mongoose = require('mongoose');
const User = require('../../models/Limasha/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { toast } = require('react-toastify');
const keysecret = '9f2d7e0c39b837b4f4f2e215f4d26c1c36d6a946485c7cf35c1b7d60f53a5d8b'; 

//email config
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"limashamadusarani001@gmail.com",
    pass:"teulyldnjnatgdln"
  }
})

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
    const { name, username, email, password, bDate, gender, phoneNumber } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      bDate,
      gender,
      phoneNumber
    });

    const savedUser = await newUser.save();

    // Return the response
    res.status(201).json({
      status: 'success',
      data: {
        user: savedUser
      }
    });
  } catch (error) {
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
  } catch (error) {
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
      return res.status(401).json({ message: 'Invalid email' });
    }

    // Compare the user-provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If the passwords match, return success
    return res.status(200).json({ message: "Success  login", userId: user.id});
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// getUserByID
exports.getUserById = async (req, res) => {

  const { userId } = req.params;

  //check for valid id
  if (!Mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: 'invalid id' })
  }

  const user = await User.findById(userId)

  //if User not found
  if (!user) {
    return res.status(400).json({ error: 'User not found' })
  }

  res.status(200).json(user)
}

//updateUser
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//sendlink
exports.sendLink = async (req, res) => {
  console.log(req.body)

  const { email } = req.body;

  if (!email) {
    return res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    const userfind = await User.findOne({ email: email });
    
    if (!userfind) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const token = jwt.sign({ _id: userfind._id }, keysecret, {
      expiresIn: "120s"
    });
    
    const setusertoken = await User.findByIdAndUpdate({_id:userfind._id}, {verifytoken:token},{new:true})

    if(setusertoken){
      const mailOptions = {
        from: "limashamadusarani001@gmail.com",
        to:email,
        subject:"Sending email for password reset",
        text:`This link valid for 2 MINUTES http://localhost:3000/passwordReset/${userfind._id}/${setusertoken.verifytoken}`
      }

      transporter.sendMail(mailOptions,(error,info) => {
        if(error){
          console.log("error",error);
          res.status(401).json({status:401,message:"Email not send"})
        }else{
          console.log("Email sent",info.response);
          res.status(201).json({status:201,message:"Email send successfully"})
        }
      })
    }

    // Send token back in the response
    return res.status(200).json({ status: 200, message: "Token generated successfully", token: token });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

//verifyUser
exports.passwordReset = async (req, res) => {

  const {userId,token} = req.params;
  console.log("token", token)
  
  try{
    const validuser = await User.findOne({_id:userId,verifytoken:token});

    const verifyToken = jwt.verify(token,keysecret);

    console.log(verifyToken)

    if(validuser && verifyToken._id){
      res.status(201).json({status:201,validuser})
    }else{
      res.status(401).json({status:401,message:"User not exist"})
    }

  }catch(error){
    res.status(401).json({status:401,error})
  }
}

//changepassword
exports.changePassword = async (req, res) => {
  // const {userId,token} = req.params;
  const userId = req.params.userId;
  const token = req.params.token;

  const {password} = req.body;
  console.log(password)

  try{
    const validuser = await User.findOne({_id:userId,verifytoken:token});

    const verifyToken = jwt.verify(token,keysecret);

    if(validuser && verifyToken._id){
      const newpassword = await bcrypt.hash(password,12);

      const setnewuserpass = await User.findByIdAndUpdate(userId, {password: newpassword});

      setnewuserpass.save();

      res.status(201).json({status:201,setnewuserpass})

    }else{
      res.status(401).json({status:401,message:"User not exist"})
    }

  }catch(error){
    res.status(401).json({status:401,error})
  }
};
