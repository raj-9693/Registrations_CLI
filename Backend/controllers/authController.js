const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail'); 

const crypto = require('crypto');

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
      process.env.REFRESH_TOKEN_SECRET,
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
    console.log(" Signup Backend Error:", error); 
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
     console.log(" Login Backend Error:", error); 
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};

// Forgatepassword Backen code 

// const sendEmail = require('../utils/sendEmail');

// ============================================
// STEP 1: Forgot Password - Email verify karke OTP bhejo
// Route: POST /api/auth/forgot-password
// ============================================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation - email khali na ho
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Check karo email exist karta hai ya nahi
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address',
      });
    }

    // 6-digit random OTP generate karo
    const otp = crypto.randomInt(100000, 999999).toString();

    // OTP ko hash karke save karo (plain text me save nahi karte, security ke liye)
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.resetPasswordOTP = hashedOTP;
    user.resetPasswordOTPExpiry = Date.now() + 5 * 60 * 1000; // 10 minute valid
    await user.save();

    // Email bhejo OTP ke sath
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset OTP',
        html: `
          <p>Hi ${user.firstName},</p>
          <p>Your OTP for password reset is:</p>
          <h2>${otp}</h2>
          <p>This OTP is valid for 5 minutes. If you didn't request this, please ignore this email.</p>
        `,
      });
    } catch (emailError) {
      // Agar email bhejne me fail ho jaye, to OTP wapas clear kar do
      user.resetPasswordOTP = undefined;
      user.resetPasswordOTPExpiry = undefined;
      await user.save();
           console.log(" Forgotepassword Backend Error :", emailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email. Please try again later.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
    });


  } catch (error) {
     console.log(" forgotepassword Backend Error:", error); 
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};

// ============================================
// STEP 2: Verify OTP
// Route: POST /api/auth/verify-otp
// ============================================
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
 
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required',
      });
    }
 
    // OTP fields bhi chahiye, isliye +select karo
    const user = await User.findOne({ email }).select(
      '+resetPasswordOTP +resetPasswordOTPExpiry'
    );
 
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address',
      });
    }
 
    // Check karo OTP request kiya tha ya nahi
    if (!user.resetPasswordOTP || !user.resetPasswordOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: 'No OTP request found. Please request a new OTP.',
      });
    }
 
    // Check karo OTP expire to nahi hua
    if (user.resetPasswordOTPExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.',
      });
    }
 
    // OTP match karo (hashed OTP se compare)
    const isOTPValid = await bcrypt.compare(otp, user.resetPasswordOTP);
 
    if (!isOTPValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.',
      });
    }
 
    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
     console.log(" Otp Backend Error:", error); 
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};
 
// ============================================
// STEP 3: Reset Password (naya password set karo)
// Route: POST /api/auth/reset-password
// ============================================
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
 
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP and new password are required',
      });
    }
 
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
    }
 
    const user = await User.findOne({ email }).select(
      '+resetPasswordOTP +resetPasswordOTPExpiry'
    );
 
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address',
      });
    }
 
    if (!user.resetPasswordOTP || !user.resetPasswordOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: 'No OTP request found. Please request a new OTP.',
      });
    }
 
    if (user.resetPasswordOTPExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.',
      });
    }
 
    // OTP dobara verify karo (security ke liye - direct reset call na ho jaye)
    const isOTPValid = await bcrypt.compare(otp, user.resetPasswordOTP);
 
    if (!isOTPValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.',
      });
    }
 
    // Naya password hash karke save karo
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
 
    // OTP fields clear kar do - dobara use na ho sake
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiry = undefined;
 
    // Security: purana refresh token bhi invalidate kar do
    // (taaki purane device pe koi logged-in na reh jaye password change hone ke baad)
    user.refreshToken = undefined;
 
    await user.save();
 
    return res.status(200).json({
      success: true,
      message: 'Password reset successfully. Please login with your new password.',
    });
  } catch (error) {
 console.log(" RecreatPassword Backend Error:", error); 
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};


module.exports = { signup, Login,forgotPassword ,verifyOTP,resetPassword};

