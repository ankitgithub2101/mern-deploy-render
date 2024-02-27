const router = require("express").Router();
const User = require("../models/usersModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// register new user //register api
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {

    const userName = existingUser.name;
      return res.send({
        message: `${userName} already exists` ,
        success: false,
        data: null,
      });
    }
    // to hash password                      for adding text    number of routes
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    // creating new user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User Created Successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// login api
// in login we have to compare with hashed pass
router.post("/login", async (req, res) => {
  try {
    const userExists = await  User.findOne({ email: req.body.email });

    if (!userExists) {

      return res.send({
        message: "User does not exists",
        success: false,
        data: null,
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userExists.password
    );

    if (!passwordMatch) {
      return res.send({
        message: "Incorrect password",
        success: false,
        data: null,
      });
    }

    const token = jwt.sign(
      // we r encrypting only userId in jwt & sending encrypted form of userId nothing bt token in frontend
      { userId: userExists._id },process.env.jwt_secret, { expiresIn: "1d" });
     
      const userName = userExists.name;
    res.send({
      message: `Welcome, ${userName}! you have successfully logged in `,
      success: true,
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// get-user-by-id api

// we are getting only token  from frntend we dint no what is user id for that 
// v have to decrypt token and then v have to get user id then v need perform find user by id
// then u have to send user object to frontend
// so the 1st thing v have to get user id from the token
// how to get that? --> for that v are going to write a middilware called auth middleware

router.post("/get-user-by-id", authMiddleware , async (req, res) => {
try {
  const user = await User.findById(req.body.userId).select('-password -_id -email -createdAt -updatedAt -__v');
  res.send({
    message:"User fetched successfully",
    success:true,
    data:user,

  })
} catch (error) {
  res.send({
    message:error.message,
    success:false,
    data:null,

  });
}
});

// reset password api
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validate email and new password (add more validation if needed)
    // Check if the user with the provided email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({
        message: "User with the provided email does not exist",
        success: false,
        data: null,
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.send({
      message: "Password reset successful",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});


module.exports = router;
