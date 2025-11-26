import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Blotter from "../models/Blotter.js";

const router = express.Router();

// --- HELPER: Format Date for UI (e.g., "Oct 14, 10:45 AM") ---
const formatDate = (dateString) => {
  if (!dateString) return "Pending";
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// --- HELPER: Generate Status Timeline based on DB Status ---
const generateTimeline = (blotter) => {
  const currentStatus = blotter.status; // "Pending", "Under Review", etc.
  const updatedAt = formatDate(blotter.updated_at);
  const createdAt = formatDate(blotter.created_at);

  // Define the 4 UI steps
  return [
    {
      title: "Report Submitted",
      date: createdAt,
      completed: true, // Always true if record exists
      color: "green",
    },
    {
      title: "Officer Assigned",
      date: ["Pending"].includes(currentStatus) ? "Waiting..." : updatedAt,
      completed: !["Pending"].includes(currentStatus),
      color: "blue",
    },
    {
      title: "Investigation Ongoing",
      date: ["Pending", "Under Review"].includes(currentStatus)
        ? "Waiting..."
        : updatedAt,
      completed: ["Investigating", "Resolved", "Closed"].includes(
        currentStatus
      ),
      color: "orange",
    },
    {
      title: "Case Resolved",
      date: ["Resolved", "Closed"].includes(currentStatus)
        ? updatedAt
        : "Waiting...",
      completed: ["Resolved", "Closed"].includes(currentStatus),
      color: "red",
    },
  ];
};

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
   Get blotters for the Main List View
========================================================= */
router.get("/my-blotters", authMiddleware, async (req, res) => {
  try {
    const rawBlotters = await Blotter.find({ userId: req.user.id }).sort({
      created_at: -1,
    });

    // Transform data to fit the Frontend List Item exactly
    const formattedBlotters = rawBlotters.map((b) => ({
      _id: b._id,
      blotterNumber: b.blotterNumber,
      incidentType: b.incident.type,
      location: b.incident.location.address || "Location Pending",
      date: formatDate(b.created_at),
      status: b.status,
    }));

    res.json({ blotters: formattedBlotters });
  } catch (err) {
    console.error("Error fetching blotters:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================================
   GET /track/:number 
   Get Details for the Modal (Includes Timeline Logic)
========================================================= */
router.get("/track/:number", async (req, res) => {
  try {
    const blotter = await Blotter.findOne({
      blotterNumber: req.params.number.trim(),
    });

    if (!blotter) {
      return res.status(404).json({ message: "Blotter number not found" });
    }

    // Generate the timeline based on the current status
    const timelineData = generateTimeline(blotter);

    // Construct the specific object the Modal needs
    const responseData = {
      blotterNumber: blotter.blotterNumber,
      incidentType: blotter.incident.type,
      dateTime: `${formatDate(blotter.incident.date)}`,
      location: blotter.incident.location.address,
      description: blotter.incident.description,

      // Database doesn't have an officer field yet, so we mock it or pull from station
      assignedOfficer: "Officer Assigned (Pending Name)",

      policeStation: blotter.policeStation.name,
      contact: "(088) 123-4567", // Standard hotline or from blotter.policeStation

      // The Dynamic Arrays
      timeline: timelineData,
      photoEvidence:
        blotter.attachments.photos.length > 0
          ? blotter.attachments.photos[0]
          : null,
    };

    res.json(responseData);
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

export default router;
