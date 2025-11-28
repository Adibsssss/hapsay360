import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  submitBlotter,
  getMyBlotters,
  trackBlotter,
  deleteBlotter,
} from "../controllers/blotterController.js";

const router = express.Router();

router.post("/submit", authMiddleware, asyncHandler(submitBlotter));
router.get("/my-blotters", authMiddleware, asyncHandler(getMyBlotters));
router.get("/track/:number", asyncHandler(trackBlotter));
router.delete("/:id", authMiddleware, asyncHandler(deleteBlotter));

export default router;
