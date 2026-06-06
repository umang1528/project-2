import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { verifyAccessToken } from '../utils/generateToken.js';

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER =", authHeader);

  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.replace('Bearer ', '')
    : null;

  console.log("TOKEN =", token);

  if (!token) {
    return next(new ApiError(401, 'Authentication required'));
  }

  try {
    const payload = verifyAccessToken(token);

    console.log("PAYLOAD =", payload);

    const user = await User.findById(payload.id).select('-password');

    console.log("USER =", user);

    if (!user) {
      return next(new ApiError(401, 'Invalid authentication token'));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("AUTH ERROR =", error.message);

    return next(
      new ApiError(401, 'Invalid or expired authentication token')
    );
  }
}