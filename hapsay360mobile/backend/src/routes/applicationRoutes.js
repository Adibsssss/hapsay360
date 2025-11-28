import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getApplication,
  saveApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

router.get("/get", authMiddleware, getApplication);
router.post("/save", authMiddleware, saveApplication);

export default router;
