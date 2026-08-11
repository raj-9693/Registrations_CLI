const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Signup server code 
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Step 1: Validation - koi field khali na ho
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
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

    // Step 3: Password length check
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
    }

    // Step 4: Phone number format check (10 digit)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit phone number',
      });
    }

    // Step 5: Check karo email pehle se exist to nahi karta
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    // Step 6: Check karo phone number pehle se exist to nahi karta
    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message: 'An account with this phone number already exists',
      });
    }

    // Step 7: Password hash karo
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 8: User create karo
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // Step 9: Success response (password kabhi wapas mat bhejo)
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};

module.exports = { signup };