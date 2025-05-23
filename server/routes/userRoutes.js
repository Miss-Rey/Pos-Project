// routes/userRoutes.js
import express from 'express';
import { getAllUsers, getUserById } from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', auth, role('admin'), getAllUsers);
router.get('/:id', auth, getUserById);

export default router;
