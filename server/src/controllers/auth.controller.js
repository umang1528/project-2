import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/generateToken.js';
import { env } from '../config/env.js';

const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function buildUserResponse(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
}

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ApiError(400, 'Name, email and password are required'));
  }

  if (password.length < 8) {
    return next(new ApiError(400, 'Password must be at least 8 characters long'));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError(409, 'Email already in use'));
  }

  const user = await User.create({ name, email, password, role: 'admin' });
  const payload = { id: user._id.toString(), email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, cookieOptions);

  res.status(201).json({
    status: 'success',
    data: {
      user: buildUserResponse(user),
      accessToken,
    },
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError(400, 'Email and password are required'));
  }

  const user = await User.findOne({ email });
  if (!user || user.role !== 'admin') {
    return next(new ApiError(401, 'Invalid credentials'));
  }

  const passwordMatches = await user.comparePassword(password);
  if (!passwordMatches) {
    return next(new ApiError(401, 'Invalid credentials'));
  }

  const payload = { id: user._id.toString(), email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, cookieOptions);

  res.status(200).json({
    status: 'success',
    data: {
      user: buildUserResponse(user),
      accessToken,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = '';
      await user.save();
    }
  }

  res.clearCookie('refreshToken', {
    ...cookieOptions,
    maxAge: 0,
  });

  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
});

export const refreshToken = asyncHandler(async (req, res, next) => {
  const refreshTokenValue = req.cookies?.refreshToken;
  if (!refreshTokenValue) {
    return next(new ApiError(401, 'Refresh token not provided'));
  }

  try {
    const payload = verifyRefreshToken(refreshTokenValue);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== refreshTokenValue) {
      return next(new ApiError(401, 'Invalid refresh token'));
    }

    const tokenPayload = { id: user._id.toString(), email: user.email, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('refreshToken', newRefreshToken, cookieOptions);

    res.status(200).json({ status: 'success', data: { accessToken } });
  } catch (error) {
    return next(new ApiError(401, 'Refresh token invalid or expired'));
  }
});

export const me = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ status: 'fail', message: 'Not authenticated' });
  }

  res.status(200).json({
    status: 'success',
    data: buildUserResponse(req.user),
  });
});
