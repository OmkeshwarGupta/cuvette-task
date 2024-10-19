const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const OTP = require("../models/otp");

exports.sendOTP = async (req, res) => {
  try {
    // Get email from request body
    const { companyEmail } = req.body;

    //   Check if email is already registered
    const checkUserExist = await User.findOne({ companyEmail });

    // If email is registered

    if (checkUserExist) {
      return res.status(401).json({
        success: false,
        error: "Email is already registered",
      });
    }
    // generate OTP

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp);
    // check unique OTP
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = {
        companyEmail,
      otp,
    };

    // Save OTP in database
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    // return success response
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.log("Error in sending OTP", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Register a new company
exports.register = async (req, res) => {
  const { name, phone, companyName, companyEmail, employeeSize, password ,otp } =
    req.body;

  // Validate input
  if (
    !name ||
    !phone ||
    !companyName ||
    !companyEmail ||
    !employeeSize ||
    !password ||
    !otp

  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ companyEmail });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const recentOTP = await OTP.findOne({ companyEmail })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOTP);

    // validate OTP

    if (recentOTP.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (recentOTP.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    user = new User({
      name,
      phone,
      companyName,
      companyEmail,
      employeeSize,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

   

    res
      .status(201)
      .json({ msg: "Registration successful. Please verify your email." });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    // get data from request body

    const { companyEmail, password } = req.body;

    // validation of data

    if (!companyEmail || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if user exists

    const user = await User.findOne({ companyEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // generate JWT after checking password

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // generate JWT token

    if (isPasswordValid) {
      const payload = {
        email: user.companyEmail,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User logged in successfully",
        token: token,
        user: user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.log("Error in user login", error);
    return res.status(500).json({
      success: false,
      message: "Error in user login",
      error: error.message,
    });
  }
};
