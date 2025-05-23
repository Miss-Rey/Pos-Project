// routes/authRoutes.js
import express from 'express';
import Joi from 'joi';

import { register, login, getMe } from '../controllers/authController.js';
import validate from '../middleware/validateMiddleware.js';
import rateLimiter from '../middleware/rateLimiter.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Debug logs
console.log('[DEBUG] rateLimiter:', typeof rateLimiter);
console.log('[DEBUG] validate:', typeof validate);
console.log('[DEBUG] register:', typeof register);
console.log('[DEBUG] login:', typeof login);

// Routes
router.post(
  '/register',
  (req, res, next) => {
    console.log('Register route middleware stack:');
    console.log('1. rateLimiter exists:', typeof rateLimiter === 'function');
    next();
  },
  rateLimiter,
  (req, res, next) => {
    console.log('2. validate middleware exists:', typeof validate(registerSchema) === 'function');
    next();
  },
  validate(registerSchema),
  (req, res, next) => {
    console.log('3. register controller exists:', typeof register === 'function');
    next();
  },
  register
);

router.post('/login', rateLimiter, validate(loginSchema), login);

router.get('/me', authenticate, getMe);

export default router;
