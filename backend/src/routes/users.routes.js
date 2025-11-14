import express from 'express';
import {
    getAllUsers,
    getUserCount,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/users.controller.js';

const router = express.Router();

// GET routes
router.get('/', getAllUsers);
router.get('/count', getUserCount);
router.get('/:id', getUserById);

// PUT routes
router.put('/:id', updateUser);

// DELETE routes
router.delete('/:id', deleteUser);

export default router;

