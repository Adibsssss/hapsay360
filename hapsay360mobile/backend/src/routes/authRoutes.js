import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { register, login, testDb } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.get("/test-db", asyncHandler(testDb));

export default router;
