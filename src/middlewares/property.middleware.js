const AppError = require('../utils/error/app-error');
const { getErrorResponse } = require('../utils/common/error-response');
const { StatusCodes } = require('http-status-codes');
const Property = require('../models/properties.model')

const requiredFields = [
  'id', 'title', 'type', 'price', 'state', 'city',
  'areaSqft', 'bedrooms', 'bathrooms', 'furnished',
  'availableFrom', 'listedBy', 'colorTheme', 'listingType',
];

function validateCreateRequest(req, res, next) {
  if (!req.body) {
    const error = new AppError(['Request body is required'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(
      getErrorResponse('Something went wrong in listing property', error.errors)
    );
  }

  const missingFields = requiredFields.filter(field => !req.body[field]);
  if (missingFields.length > 0) {
    const error = new AppError(
      missingFields.map(f => `${f} cannot be null`),
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(
      getErrorResponse('Missing required fields', error.errors)
    );
  }

  next();
}


async function isPropertyOwner(req, res, next) {
  try {
    const propertyId = req.params.id;
    const userId = req.user._id;

    const property = await Property.findById(propertyId);

    if (!property) {
      const err = new AppError(['Property not found'], StatusCodes.NOT_FOUND);
      return res.status(StatusCodes.NOT_FOUND).json(
        getErrorResponse('Property not found', err.errors)
      );
    }

    if (property.createdBy.toString() !== userId.toString()) {
      const err = new AppError(['You are not authorized to modify this property'], StatusCodes.FORBIDDEN);
      return res.status(StatusCodes.FORBIDDEN).json(
        getErrorResponse('Forbidden access', err.errors)
      );
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
    validateCreateRequest,
    isPropertyOwner
}