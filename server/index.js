// backend/index.js or server.js

import express from 'express';
import cors from 'cors';
// import helmet from 'helmet';
import dotenv from 'dotenv';
import { testConnection, initializeDatabase } from './config/db.js'; // ✅ Correct imports
import authRoutes from './routes/authRoutes.js';
// Load environment variables
dotenv.config();

const app = express();
// app.use(helmet());
const PORT = process.env.PORT || 5000;

// ✅ Configure CORS
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Middleware
app.use(express.json());

// Import routes



app.use('/auth', authRoutes);
import userRoutes from './routes/userRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import salesRoutes from './routes/salesRoutes.js';
import errorHandler from './middleware/errorHandler.js';

// Async function to initialize DB and start server
async function startServer() {
  try {
    const connected = await testConnection(); // ✅ Use imported function directly
    if (!connected) throw new Error('Database connection failed');

    console.log('✅ Database connected');
    await initializeDatabase(); // ✅ Initialize schema
    console.log('✅ Database initialized');

    // Register routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/inventory', inventoryRoutes);
    app.use('/api/sales', salesRoutes);
    app.use(errorHandler);

    app.get('/', (req, res) => {
      res.send('POS System backend is running.');
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Server startup failed:', err.message);
    process.exit(1);
  }
}

startServer();
