import express from 'express';
import { createClearance, getAllClearances } from '../controllers/clearance.controller.js';

const router = express.Router();

// Create a new clearance application
router.post('/create', createClearance);
router.get('/getClearances', getAllClearances);

export default router;

