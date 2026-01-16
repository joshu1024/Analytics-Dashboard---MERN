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

    const newUser = userModel({
      fullName,
      username,
      email,
      password: hashedPassword,
      role,
      country,
    });
    generateTokenAndSetCookie(newUser._id, res);
    if (newUser) {
      res.status(200).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        message: "User registered succesfully",
        success: true,
        country: newUser.country,
      });
    }
    await newUser.save();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const isCorrectPassword = await bcrypt.compare(
      password,
      user.password || ""
    );

    if (!user || !isCorrectPassword) {
      return res
        .status(400)
        .json({ error: "user not found or password incorrect" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({
      success: true,
      username: user.username,
      email: user.email,
      role: user.role,
    });
    console.log("User logged in succesfully");
  } catch (error) {
    console.log(error.message);
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
