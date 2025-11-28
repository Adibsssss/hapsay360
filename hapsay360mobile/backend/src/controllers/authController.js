import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );
};

// POST /register
export const register = async (req, res) => {
  const { email, password, username, firstName, lastName, phone_number } =
    req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });
  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already registered" });

  if (username) {
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already taken" });
  }

  const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username || email}`;

  const user = new User({
    email,
    password,
    username: username || null,
    profileImage,
    personal_info: { firstName: firstName || null, lastName: lastName || null },
    phone_number: phone_number || null,
    status: "Active",
  });

  await user.save();

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      status: user.status,
    },
  });
};

// POST /login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  if (user.status === "Suspended")
    return res.status(403).json({ message: "Your account has been suspended" });

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user);

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      status: user.status,
      personal_info: user.personal_info,
    },
  });
};

// GET /test-db
export const testDb = async (req, res) => {
  const state = require("mongoose").connection.readyState;
  const users = await User.countDocuments();
  res.json({ dbState: state, users, message: "Database connected" });
};
