import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const ACCESS_SECRET = env.JWT_ACCESS_SECRET || env.JWT_SECRET || 'access-secret-key';
const REFRESH_SECRET = env.JWT_REFRESH_SECRET || env.JWT_SECRET || 'refresh-secret-key';
const ACCESS_EXPIRES_IN = env.JWT_ACCESS_EXPIRES_IN || env.JWT_EXPIRES_IN || '15m';
const REFRESH_EXPIRES_IN = env.JWT_REFRESH_EXPIRES_IN || env.JWT_EXPIRES_IN || '7d';

export function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}
