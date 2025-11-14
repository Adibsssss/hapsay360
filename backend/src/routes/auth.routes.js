import express from 'express';
import {
    register,
    registerAdmin,
    login,
    loginAdmin
} from '../controllers/auth.controller.js';

const router = express.Router();

// User authentication routes
router.post('/register', register);
router.post('/login', login);

// Admin authentication routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

export default router;

