const bcrypt = require('bcryptjs');
const User = require('../models/User');



const jwt = require('jsonwebtoken');
 // Signup Backend server-code 
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Step 1-7: same validation + hashing (jo pehle se hai)
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit phone number' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists' });
    }

    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      return res.status(409).json({ success: false, message: 'An account with this phone number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // 🔑 Step 9: Access Token banao (short-lived — 15 minute)
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET ,
      { expiresIn: '15m' }
    );

    // 🔑 Step 10: Refresh Token banao (long-lived — 7 din)
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRE,
      { expiresIn: '7d' }
    );

    // 🔑 Step 11: Refresh token ko database me bhi save kar do
    // (taaki login/refresh ke time verify kar sakein ki ye valid hai)
    user.refreshToken = refreshToken;
    await user.save();

    // Step 12: Success response
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.log("Backend Error:", error); 
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};

// Login Backend server-code 


const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Validation - email/password khali na ho
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Step 2: Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Step 3: User ko database me dhoondo
    // password field select:false hai schema me, isliye +password lagana zaroori hai
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      // Security ke liye generic message do - "email exist nahi karta" mat batao
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Step 4: Password match karo
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Step 5: Access Token banao (short-lived - 15 minute)
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    // Step 6: Refresh Token banao (long-lived - 7 din)
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    // Step 7: Naya refresh token database me update kar do
    // (purana refresh token overwrite ho jayega - ek time me ek hi valid rahega)
    user.refreshToken = refreshToken;
    await user.save();

    // Step 8: Success response - password kabhi wapas mat bhejo
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};


module.exports = { signup, Login };

