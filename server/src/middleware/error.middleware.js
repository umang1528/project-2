import { ApiError } from '../utils/ApiError.js';

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const response = {
    status: err.status || 'error',
    message: err.message || 'Internal Server Error',
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  if (err.name === 'ValidationError') {
    response.message = 'Validation failed';
    response.errors = Object.values(err.errors).map((error) => error.message);
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    response.message = 'Duplicate key error';
    response.errors = err.keyValue;
  }

  res.status(statusCode).json(response);
}
