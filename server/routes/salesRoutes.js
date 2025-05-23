// routes/salesRoutes.js
import express from 'express';
import { getSales, recordSale, getSaleById } from '../controllers/salesController.js';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';

const router = express.Router();

// Get all sales (manager access only)
router.get('/', auth, role('manager'), getSales);

// Get specific sale by ID (fallback handler if not implemented)
router.get('/:id', auth, getSaleById || ((req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}));

// Record new sale (employee access)
router.post('/', auth, role('employee'), recordSale);

export default router;
