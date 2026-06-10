import express from 'express';
import morgan from 'morgan';

import { setupSecurity } from './middleware/security.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';

import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import mediaRoutes from './routes/media.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import homeCarouselRoutes from './routes/homeCarousel.routes.js';
import projectBreakdownRoutes from './routes/projectBreakdown.routes.js';
import contactRoutes from "./routes/contact.routes.js";

import { errorHandler } from './middleware/error.middleware.js';

import './config/env.js';

const app = express();

// Trust proxy (Render, Vercel, etc.)
app.set('trust proxy', 1);

// Security + CORS + Body Parsers
setupSecurity(app);

// Rate Limiter
app.use(apiRateLimiter);

// Logger
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is healthy',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/home-carousel', homeCarouselRoutes);
app.use('/api/project-breakdown', projectBreakdownRoutes);
app.use("/api/contact", contactRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found',
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;