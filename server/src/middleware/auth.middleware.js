import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { verifyAccessToken } from '../utils/generateToken.js';

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

  if (!token) {
    return next(new ApiError(401, 'Authentication required'));
  }

  try {
    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.id).select('-password');

    if (!user) {
      return next(new ApiError(401, 'Invalid authentication token'));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, 'Invalid or expired authentication token'));
  }
}
