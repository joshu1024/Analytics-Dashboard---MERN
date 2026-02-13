import { Request,Response,NextFunction } from "express";
import { IUsermodel } from "../models/userModel";

interface AuthRequest{
  user?:IUsermodel
}
export const adminsOnly = (req:AuthRequest, res:Response, next:NextFunction):void => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    console.log("Unauthorised - only admins allowed");
    res.status(403).json({ error: "Forbidden - admins only" });
  }
};
