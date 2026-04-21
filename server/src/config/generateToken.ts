import jwt from "jsonwebtoken";
import { Response } from "express";

interface IUserPayload {
  id: string;
  role: string;
  email: string;
}

export const generateTokenAndSetCookie = (
  user: IUserPayload,
  res: Response
): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15d" }
  );

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return token;
};
