import express from 'express';
import { createBlotter, getAllBlotters } from '../controllers/blotter.controller.js';

const router = express.Router();

router.post('/create', createBlotter);
router.get('/getBlotters', getAllBlotters);

export default router;