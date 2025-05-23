// authController.js
import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query('SELECT id, name, username, email, role FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

    res.json(rows[0]);
  } catch (error) {
    console.error('getMe Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if user already exists
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const [existingUsersByUsername] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    if (existingUsersByUsername.length > 0) {
      return res.status(409).json({ message: 'Username already taken' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const [result] = await pool.query(
      'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)',
      [name, username, email, hashedPassword]
    );

    // Generate token
    const token = jwt.sign(
      { id: result.insertId, role: 'user' },
      process.env.JWT_SECRET || '',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: result.insertId,
        name,
        username,
        email,
        role: 'user'
      }
    });

  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || '',
      { expiresIn: '1h' }
    );

    res.status(200).json({
  message: 'Login successful',
  token,
  user: {
    id: user.id,
    name: user.name,
    username: user.username, // ✅ Add this line
    email: user.email,
    role: user.role
  }
});

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
