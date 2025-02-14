// src/controllers/authController.ts

import { Request, Response } from 'express';
import UserModel from '../models/User';
import { generateToken } from '../utils/token';

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;

  // Check if the user already exists
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  // Create a new user
  const user = new UserModel({
    name,
    email,
    password,
    role,
  });

  await user.save();
  
  // Generate a token
  const token = generateToken(user._id.toString(), user.isAdmin);

  res.status(201).json({ user, token });
};

// Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await UserModel.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  // Generate a token
  const token = generateToken(user._id.toString(), user.isAdmin);
  res.json({ user, token });
};

// Create an admin user
export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  // Check if the admin already exists
  const adminExists = await UserModel.findOne({ email });
  if (adminExists) {
    res.status(400).json({ message: 'Admin already exists' });
    return;
  }

  // Create a new admin user with role set to 'admin'
  const admin = new UserModel({
    name,
    email,
    password,
    role: 'admin',
  });

  await admin.save();
  
  // Generate a token for the new admin
  const token = generateToken(admin._id.toString(), admin.isAdmin);

  res.status(201).json({ admin, token });
};
