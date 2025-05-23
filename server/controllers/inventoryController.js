// inventoryController.js
import { pool } from '../config/db.js';

// Get all inventory items
export const getInventory = (req, res) => {
  const sql = 'SELECT * FROM inventory';
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        error: 'Failed to fetch inventory',
        details: err.message
      });
    }
    res.json(results);
  });
};

// Add new inventory item
export const addInventoryItem = (req, res) => {
  const { name, quantity, cost_price, selling_price } = req.body;

  if (!name || !quantity || !cost_price || !selling_price) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO inventory (name, quantity, cost_price, selling_price) VALUES (?, ?, ?, ?)';
  pool.query(sql, [name, quantity, cost_price, selling_price], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        error: 'Failed to add inventory item',
        details: err.message
      });
    }
    res.status(201).json({
      message: 'Item added to inventory',
      itemId: result.insertId
    });
  });
};

// Placeholder methods
export const getInventoryItem = (req, res) =>
  res.status(501).json({ message: 'Not implemented' });

export const updateInventoryItem = (req, res) =>
  res.status(501).json({ message: 'Not implemented' });

export const deleteInventoryItem = (req, res) =>
  res.status(501).json({ message: 'Not implemented' });
