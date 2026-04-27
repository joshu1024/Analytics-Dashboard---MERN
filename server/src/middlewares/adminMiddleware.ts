import { Response,NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";

export const adminsOnly = (req:AuthRequest, res:Response, next:NextFunction):void => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Forbidden - admins only" });
    return
  }
};
