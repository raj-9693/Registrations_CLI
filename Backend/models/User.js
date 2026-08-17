const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  phoneNumber: { type: String, required: true, unique: true },
   refreshToken: { type: String,select: false},
     resetPasswordOTP: { type: String, select: false}, // normal query me kabhi wapas nahi aayega },
    resetPasswordOTPExpiry: { type: Date,select: false, },
     
  }, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
