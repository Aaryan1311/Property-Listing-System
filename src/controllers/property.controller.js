// src/controller/property.controller.js
const propertyService = require('../services/properties.service');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/error/app-error');
const { getErrorResponse } = require('../utils/common/error-response');
const { transformFilters } = require('../utils/common');
const { getCache, setCache, invalidatePropertyCache } = require('../utils/common');


const isCastError = (error) => error.name === 'CastError';

const createProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const newProperty = await propertyService.createProperty(propertyData);
    await invalidatePropertyCache();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Property created successfully',
      data: newProperty,
    });
  } catch (error) {
    const status = StatusCodes.INTERNAL_SERVER_ERROR;
    const err = new AppError([
      error.message || 'Failed to create property'
    ], status);
    return res.status(status).json(
      getErrorResponse('Something went wrong while creating property', err.errors)
    );
  }
};

const getAllProperties = async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    return getPropertyByFilter(req, res);
  }

  const cacheKey = 'properties:all';
  try {
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Properties fetched from cache',
        data: cached,
      });
    }

    const response = await propertyService.getAllProperties();
    await setCache(cacheKey, response, 60);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Properties fetched successfully',
      data: response,
    });
  } catch (error) {
    const err = new AppError([
      error.message || 'Failed to fetch properties'
    ], StatusCodes.INTERNAL_SERVER_ERROR);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      getErrorResponse('Something went wrong while fetching properties', err.errors)
    );
  }
};

const getPropertyById = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `property:${id}`;

  try {
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Property fetched from cache',
        data: cached,
      });
    }

    const response = await propertyService.getPropertyById(id);

    if (!response) {
      const err = new AppError(['Property not found'], StatusCodes.NOT_FOUND);
      return res.status(StatusCodes.NOT_FOUND).json(
        getErrorResponse('Property retrieval failed', err.errors)
      );
    }

    await setCache(cacheKey, response, 300);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Property fetched successfully',
      data: response,
    });
  } catch (error) {
    const status = isCastError(error)
      ? StatusCodes.BAD_REQUEST
      : StatusCodes.INTERNAL_SERVER_ERROR;

    const err = new AppError([
      isCastError(error) ? 'Invalid property ID format' : error.message
    ], status);

    return res.status(status).json(
      getErrorResponse('Something went wrong while fetching property', err.errors)
    );
  }
};

const getPropertyByFilter = async (req, res) => {
  const filters = transformFilters(req.query);
  const cacheKey = `properties:filters:${JSON.stringify(filters)}`;

  try {
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Filtered properties from cache',
        data: cached,
      });
    }

    const response = await propertyService.getPropertyByFilter(filters);

    if (!response || response.length === 0) {
      const err = new AppError([
        'No properties found with the given filter'
      ], StatusCodes.NOT_FOUND);
      return res.status(StatusCodes.NOT_FOUND).json(
        getErrorResponse('Property retrieval failed', err.errors)
      );
    }

    await setCache(cacheKey, response, 60);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Filtered properties fetched successfully',
      data: response,
    });
  } catch (error) {
    const status = isCastError(error)
      ? StatusCodes.BAD_REQUEST
      : StatusCodes.INTERNAL_SERVER_ERROR;

    const err = new AppError([
      isCastError(error) ? 'Invalid filter format' : error.message
    ], status);

    return res.status(status).json(
      getErrorResponse('Something went wrong while fetching filtered properties', err.errors)
    );
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await propertyService.updateProperty(id, req.body);

    if (!response) {
      const err = new AppError(['Property not found or not updated'], StatusCodes.NOT_FOUND);
      return res.status(StatusCodes.NOT_FOUND).json(getErrorResponse('Update failed', err.errors));
    }

    await invalidatePropertyCache(id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Property updated successfully',
      data: response,
    });
  } catch (error) {
    const status = isCastError(error)
      ? StatusCodes.BAD_REQUEST
      : StatusCodes.INTERNAL_SERVER_ERROR;

    const err = new AppError([
      isCastError(error) ? 'Invalid property ID format' : error.message
    ], status);

    return res.status(status).json(
      getErrorResponse('Something went wrong while updating property', err.errors)
    );
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await propertyService.deleteProperty(id);

    if (!response) {
      const err = new AppError(['Property not found or not deleted'], StatusCodes.NOT_FOUND);
      return res.status(StatusCodes.NOT_FOUND).json(getErrorResponse('Deletion failed', err.errors));
    }

    await invalidatePropertyCache(id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Property deleted successfully',
      data: response,
    });
  } catch (error) {
    const status = isCastError(error)
      ? StatusCodes.BAD_REQUEST
      : StatusCodes.INTERNAL_SERVER_ERROR;

    const err = new AppError([
      isCastError(error) ? 'Invalid property ID format' : error.message
    ], status);

    return res.status(status).json(
      getErrorResponse('Something went wrong while deleting property', err.errors)
    );
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  getPropertyByFilter,
  updateProperty,
  deleteProperty,
};