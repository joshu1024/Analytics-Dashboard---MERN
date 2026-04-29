import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IUserPayload{
  id:string,
  email:string,
  role:string
}
export interface AuthRequest extends Request {
  user?: IUserPayload
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    let token:string | undefined;
    if(req.cookies?.jwt){
       token = req.cookies.jwt
    }
    
   else if (req.headers.authorization?.startsWith("Bearer ")) {
       token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUserPayload
    console.log(decoded)
    req.user = decoded; 

    next();
  } catch (err: unknown) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};