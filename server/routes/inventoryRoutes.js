// routes/inventoryRoutes.js
import express from 'express';
import { getInventory, addInventoryItem } from '../controllers/inventoryController.js';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';

const router = express.Router();

// Current working routes
router.get('/', auth, getInventory);
router.post('/', auth, role('manager'), addInventoryItem);

// Placeholder routes for future implementation
router.get('/:id', auth, (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
});

router.put('/:id', auth, role('manager'), (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
});

router.delete('/:id', auth, role('admin'), (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
});

export default router;
