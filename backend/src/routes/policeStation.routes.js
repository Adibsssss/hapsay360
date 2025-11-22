import express from 'express';
import { createPoliceStation } from '../controllers/policeStation.controller.js';

const router = express.Router();

router.post('/create', createPoliceStation);


export default router;