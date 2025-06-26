import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password)
      return res
        .status(400)
        .json({ success: false, message: "name email password are required" });

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(409).json({ message: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "registration successfull" });
  } catch (error: any) {
    console.error(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "email password are required" });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = generateToken({ _id: user._id, email: user.email });
// console.log(token)
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // ------------------ 7 days
      })
      .json({ success: true, message: "login successfull" });
  } catch (error: any) {
    console.error(error.message);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.error(error.message);
  }
};
