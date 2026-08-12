const express = require('express');
const router = express.Router();
const { signup,Login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/Login', Login);


module.exports = router;