const express = require('express');
const router = express.Router();
const { signup,Login,forgotPassword,verifyOTP,resetPassword } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/Login', Login);
router.post('/forgot-password', forgotPassword);
router.post('/Otp',verifyOTP);
router.post('/resetpassword',resetPassword)


module.exports = router;