// salesController.js
import { pool } from '../config/db.js';

// Get all sales records
export const getSales = (req, res) => {
  const sql = 'SELECT * FROM sales';
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        error: 'Failed to fetch sales records',
        details: err.message
      });
    }
    res.json(results);
  });
};

// Record a new sale
export const recordSale = (req, res) => {
  const { item_id, quantity_sold, total_price, sold_by } = req.body;

  if (!item_id || !quantity_sold || !total_price || !sold_by) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO sales (item_id, quantity_sold, total_price, sold_by) VALUES (?, ?, ?, ?)';
  pool.query(sql, [item_id, quantity_sold, total_price, sold_by], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        error: 'Failed to record sale',
        details: err.message
      });
    }
    res.status(201).json({
      message: 'Sale recorded successfully',
      saleId: result.insertId
    });
  });
};

// Get sale by ID
export const getSaleById = (req, res) => {
  const saleId = req.params.id;
  const sql = 'SELECT * FROM sales WHERE id = ?';

  pool.query(sql, [saleId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        error: 'Failed to fetch sale record',
        details: err.message
      });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(results[0]);
  });
};
