import mongoose,{Schema,Document} from "mongoose";
export interface IUsermodel extends Document{
  fullName:string,
  username:string,
  email:string,
  password:string,
  gender: "male"| "female",
  role: "admin" | "user",
  country:string,
  lastLogin:Date | null,
  isActive:boolean,
  resetPasswordToken:string,
  resetPasswordTime:Date,
  createdAt?:Date,
  updatedAt?:Date
}

const userSchema = new Schema<IUsermodel>(
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

const userModel = mongoose.model<IUsermodel>("userModel", userSchema);
 export default userModel;
