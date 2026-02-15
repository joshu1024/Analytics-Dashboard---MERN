import  { generateTokenAndSetCookie } from"../config/generateToken"
import  Event from"../models/Event"
import  userModel from"../models/userModel"
import  bcrypt from"bcryptjs"
import  crypto from"crypto"
import { Request,Response } from "express";

interface RegisterBody{
      fullName:string,
      username:string,
      email:string,
      password:string,
      confirmPassword:string,
      role?:string,
      country?:string,
      gender?:string,
}
interface LoginBody{
  email:string,
  password:string
}
interface ForgotPassword{
  email:string
}
export const registerUser = async (req:Request<{},{},RegisterBody>, res:Response):Promise<void> => {
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
       res.status(400).json({ error: "User already exists" });
       return
    }
    if (password !== confirmPassword) {
       res.status(400).json({ error: "both passwords must match" });
       return
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

    const token = generateTokenAndSetCookie(
      {
        id: newUser._id.toString(),
        role: newUser.role,
        email: newUser.email,
      },
      res
    );

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
  } catch (err:unknown) {
    const message = err instanceof Error ? err.message : "Internal server error"
    res.status(500).json({ message});
  }
};
export const loginUser = async (req:Request<{},{},LoginBody>, res:Response):Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
       res.status(400).json({ error: "Invalid credentials" });
       return
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
       res.status(400).json({ error: "Invalid credentials" });
       return
    }

   const token = generateTokenAndSetCookie(
    {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
    },
    res
  );

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
  } catch (err:unknown) {
    const message = err instanceof Error ? err.message : "Internal server error"
    res.status(500).json({ message});
  }
};

export const logoutUser = async (req:Request, res:Response):Promise<void> => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out succesfully" });
    return;
  }catch (err:unknown) {
    const message = err instanceof Error ? err.message : "Internal server error"
    res.status(500).json({ message});
  }
};
export const forgotPassword = async (req:Request<{},{},ForgotPassword>, res:Response):Promise<void> => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "user not found" });
      return
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = hashedToken;
     user.resetPasswordTime = new Date(Date.now() + 15 * 60 * 1000);
     await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    // TODO: send email (nodemailer)
    console.log("RESET LINK:", resetLink);
    res.json({ message: "reset link sent to email" });
    return
  } catch (err:unknown) {
    const message = err instanceof Error ? err.message : "Internal server error"
    res.status(500).json({ message});
  }
};
export const resetPassword = async (req:Request, res:Response):Promise<void> => {};


