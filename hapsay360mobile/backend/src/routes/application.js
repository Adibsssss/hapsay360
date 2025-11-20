import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.json({ profile: null });

    res.json({
      profile: {
        personal_info: user.personal_info,
        address: user.address,
        other_info: user.other_info,
        family: user.family,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/save", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { personal_info, address, other_info, family } = req.body;

    user.personal_info = personal_info;
    user.address = address;
    user.other_info = other_info;
    user.family = family;

    await user.save();
    res.json({ message: "Application form saved successfully", profile: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
