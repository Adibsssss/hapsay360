// routes/blotterRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Blotter from "../models/Blotter.js";

const router = express.Router();

/* =========================================================
   POST /submit  
   Create a new blotter entry
========================================================= */
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { reporter, incident, attachments, policeStation } = req.body;

    const newBlotter = new Blotter({
      userId: req.user.id,
      reporter,
      incident,
      attachments,
      policeStation,
    });

    await newBlotter.save();

    res.json({
      message: "Blotter submitted successfully",
      blotter: newBlotter,
    });
  } catch (err) {
    console.error("Error submitting blotter:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================================
   GET /my-blotters  
   Get blotters of authenticated user
========================================================= */
router.get("/my-blotters", authMiddleware, async (req, res) => {
  try {
    const blotters = await Blotter.find({ userId: req.user.id }).sort({
      created_at: -1,
    });

    res.json({ blotters });
  } catch (err) {
    console.error("Error fetching blotters:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================================
   GET /:id  
   Get a single blotter by ID (must belong to the same user)
========================================================= */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const blotter = await Blotter.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!blotter) {
      return res.status(404).json({ message: "Blotter not found" });
    }

    res.json({ blotter });
  } catch (err) {
    console.error("Error fetching blotter:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================================
   GET /track/:number  
   PUBLIC tracking using blotter number
========================================================= */
router.get("/track/:number", async (req, res) => {
  try {
    const blotter = await Blotter.findOne({
      blotterNumber: req.params.number.trim(),
    });

    if (!blotter) {
      return res.status(404).json({ message: "Blotter number not found" });
    }

    res.json({
      blotterNumber: blotter.blotterNumber,
      status: blotter.status,
      created_at: blotter.created_at,
    });
  } catch (err) {
    console.error("Error tracking blotter:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================================
   DELETE /:id  
   Delete blotter (user-owned only)
========================================================= */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blotter = await Blotter.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!blotter) {
      return res
        .status(404)
        .json({ message: "Blotter not found or not yours" });
    }

    res.json({ message: "Blotter deleted successfully" });
  } catch (err) {
    console.error("Error deleting blotter:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================================
   PUT /:id/status  
   ADMIN ONLY (optional)
========================================================= */
router.put("/:id/status", async (req, res) => {
  try {
    const { status, notes } = req.body;

    const blotter = await Blotter.findById(req.params.id);
    if (!blotter) {
      return res.status(404).json({ message: "Blotter not found" });
    }

    blotter.status = status || blotter.status;
    if (notes) blotter.notes = notes;

    await blotter.save();

    res.json({ message: "Status updated", blotter });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
