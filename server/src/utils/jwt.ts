import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) throw new Error("JWT_SECRET_KEY is missing");

interface User {
  _id: string;
  email: string;
}

interface TokenPayload {
  id: string;
  email: string;
}

export const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
};


