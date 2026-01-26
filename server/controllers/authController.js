import { generateTokenAndSetCookie } from "../config/generateToken.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
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

    const newUser = userModel.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      role,
      country,
      lastLogin: new Date(),
      gender,
    });
    const token = generateTokenAndSetCookie(newUser._id, res);
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
export const loginUser = async (req, res) => {
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

    const token = await generateTokenAndSetCookie(user._id, res);
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out succesfully" });
  } catch (error) {
    console.log("error in logout controller".error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
