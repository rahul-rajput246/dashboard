import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import asyncHandler from "../utils/asyncHandler";
import generateToken from "../utils/generateToken";

const sanitizeUser = (user: {
  _id: unknown;
  name: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "sales",
  });

  res.status(201).json({
    token: generateToken(user._id.toString()),
    user: sanitizeUser(user),
  });
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.status(200).json({
    token: generateToken(user._id.toString()),
    user: sanitizeUser(user),
  });
});

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    user: sanitizeUser(req.user),
  });
});
