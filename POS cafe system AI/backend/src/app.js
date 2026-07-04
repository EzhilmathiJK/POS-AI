import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// 1. Security & Standard Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Logging
app.use(morgan('dev'));

// 3. Rate Limiting (Basic Protection)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api', apiLimiter);

// 4. API Routes
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/users/users.routes.js';
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

// 5. 404 Handler for undefined routes
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.statusCode = 404;
  next(error);
});

// 6. Centralized Error Handler
app.use(errorHandler);

export default app;
