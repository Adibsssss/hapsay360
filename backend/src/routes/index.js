import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './users.routes.js';
import clearanceRoutes from './clearance.routes.js';
import policeStationRoutes from './policeStation.routes.js';

const router = express.Router();

// Mount all routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/clearance', clearanceRoutes)
router.use('/police-stations', policeStationRoutes);


export default router;

