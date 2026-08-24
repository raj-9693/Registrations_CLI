const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    // Step 1: Header se Token nikalo
    const token = req.headers.authorization?.split(' ')[1];
    // "Bearer eyJhbGci..." me se sirf "eyJhbGci..." wala part

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized, no token' 
      });
    }

    // Step 2: Token verify karo (JWT_SECRET se)
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Step 3: Token se mili userId se, poora User dhoondo
    req.user = await User.findById(decoded.userId);

    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Step 4: Sab sahi hai — agla Controller chalne do
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized, invalid token' 
    });
  }
};

module.exports = { protect };