const { generateTokenAndSetCookie } = require("../config/generateToken");
const Event = require("../models/Event.js");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
      confirmPassword,
      role,
      country,
      gender,
    } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "both passwords must match" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      role,
      country,
      lastLogin: new Date(),
      gender,
    });

    const token = generateTokenAndSetCookie(newUser, res);
    await Event.create({
      type: "User Registration",
      user: newUser._id,
    });
    if (newUser) {
      res.status(200).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        message: "User registered succesfully",
        success: true,
        country: newUser.country,
        token,
        gender,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateTokenAndSetCookie(user, res);
    user.lastLogin = new Date();
    await user.save();
    await Event.create({
      type: "USER_LOGIN",
      user: user._id,
    });

    res.status(200).json({
      success: true,
      email: user.email,
      role: user.role,
      token,
      fullName: user.fullName,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out succesfully" });
  } catch (error) {
    console.log("error in logout controller".error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordTime = new Date() + 15 * 60 * 1000;
    user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    // TODO: send email (nodemailer)
    console.log("RESET LINK:", resetLink);
    res.json({ message: "reset link sent to email" });
  } catch (error) {}
};
const resetPassword = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
