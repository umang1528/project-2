import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import { env } from '../config/env.js';

const allowedOrigins = Array.from(
  new Set(
    [env.CLIENT_URL, ...(env.CLIENT_URLS ? env.CLIENT_URLS.split(',') : [])]
      .filter(Boolean)
      .map((origin) => origin.trim())
  )
);

export function setupSecurity(app) {
  app.use(helmet());
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(express.json({ limit: '12mb' }));
  app.use(express.urlencoded({ extended: true, limit: '12mb' }));
  app.use(xss());
  app.use(mongoSanitize());
  app.use(hpp());
  app.use(compression());

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error('CORS policy: origin not allowed'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      optionsSuccessStatus: 204,
    })
  );
}
