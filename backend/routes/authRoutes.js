const express = require('express');
const router = express.Router();
const { register, login ,sendOTP } = require('../controllers/authController');

router.post("/sendotp", sendOTP);
router.post('/register', register);
router.post('/login', login);


module.exports = router;
