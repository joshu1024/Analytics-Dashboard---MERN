import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String, unique: true, minLength: 6 },
    gender: { type: String, enum: ["male", "female"] },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    country: { type: String },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true },
);

const userModel = mongoose.model("UserModel", userSchema);
export default userModel;
