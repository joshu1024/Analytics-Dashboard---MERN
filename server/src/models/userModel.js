const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String, minLength: 6 },
    gender: { type: String, enum: ["male", "female"] },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    country: { type: String },
    lastLogin: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true },
);

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
