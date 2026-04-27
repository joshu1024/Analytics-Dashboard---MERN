import jwt from "jsonwebtoken";
import { Response } from "express";
import {IUserPayload} from "../types/authTypes"


export const generateTokenAndSetCookie = (
  user: IUserPayload,
  res: Response
): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const EXPIRY_DAYS = 15;
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: `${EXPIRY_DAYS}` }
  );

  res.cookie("jwt", token, {
    maxAge: EXPIRY_DAYS * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return token;
};
