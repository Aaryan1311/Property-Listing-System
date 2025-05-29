const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const AppError = require('../utils/error/app-error');
const { StatusCodes } = require('http-status-codes');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication token missing', StatusCodes.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    try{
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded
      next();
  } catch (error) {
    next(new AppError('Not authorized to access this resource', StatusCodes.UNAUTHORIZED));
  }
};

module.exports = authMiddleware;
