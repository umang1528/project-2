import express from 'express';
import morgan from 'morgan';
import { setupSecurity } from './middleware/security.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import mediaRoutes from './routes/media.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import './config/env.js';

const app = express();

// trust proxy so secure cookies work behind proxies (Vercel, Render, etc.)
app.set('trust proxy', 1);

setupSecurity(app);
app.use(apiRateLimiter);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'fail', message: 'Route not found' });
});

app.use(errorHandler);

export default app;
