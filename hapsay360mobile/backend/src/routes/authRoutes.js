import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, username, firstName, lastName, phone_number } =
      req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check if username exists (if provided)
    if (username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${
      username || email
    }`;

    const user = new User({
      email,
      password,
      username: username || null,
      profileImage,
      personal_info: {
        firstName: firstName || null,
        lastName: lastName || null,
      },
      phone_number: phone_number || null,
      status: "Active",
    });

    await user.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if account is suspended
    if (user.status === "Suspended") {
      return res
        .status(403)
        .json({ message: "Your account has been suspended" });
    }

    // Compare passwords using the method we defined in the schema
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    return res.json({
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
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

router.get("/test-db", async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    const users = await User.countDocuments();
    res.json({ dbState: state, users, message: "Database connected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
