const jwt = require('jsonwebtoken');
const AppError = require('../utils/error/app-error');
const { getErrorResponse } = require('../utils/common/error-response');
const { StatusCodes } = require('http-status-codes');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new AppError(['Token is missing or improperly formatted'], StatusCodes.UNAUTHORIZED);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(getErrorResponse('Authentication failed', err.errors));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const err = new AppError(['Invalid or expired token'], StatusCodes.UNAUTHORIZED);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(getErrorResponse('Authentication failed', err.errors));
  }
};

module.exports = authMiddleware;
