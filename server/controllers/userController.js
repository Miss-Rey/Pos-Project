// userController.js
import { pool } from '../config/db.js';

export const getAllUsers = (req, res) => {
  const sql = 'SELECT id, username, email, role FROM users';
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getUserById = (req, res) => {
  const sql = 'SELECT id, username, email, role FROM users WHERE id = ?';
  pool.query(sql, [req.params.id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
};
