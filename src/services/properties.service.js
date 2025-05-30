const Property = require('../models/properties.model');
const AppError = require('../utils/error/app-error');
const { StatusCodes } = require('http-status-codes');

// Create a new property
const createProperty = async (data) => {
  try {
    const property = await Property.create(data);
    return property;
  } catch (error) {
    throw new AppError('Failed to create property', StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Get all properties
const getAllProperties = async () => {
  try {
    const properties = await Property.find();
    if (!properties || properties.length === 0) {
      throw new AppError('No properties found', StatusCodes.NOT_FOUND);
    }
    return properties;
  } catch (error) {
    throw new AppError('Failed to fetch properties', StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Get a single property by ID
const getPropertyById = async (id) => {
  try {
    const property = await Property.findById(id);
    if (!property) {
      throw new AppError('Property not found', StatusCodes.NOT_FOUND);
    }
    return property;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new AppError('Invalid property ID format', StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Failed to fetch property', StatusCodes.INTERNAL_SERVER_ERROR);
  }
};


//Get properties with filter => 
const getPropertyByFilter = async(data) => {
    try{
        const response = await Property.find(data);
        if (!response) {
      throw new AppError('Property not found', StatusCodes.NOT_FOUND);
    }
    return response;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new AppError('Invalid property ID format', StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Failed to fetch property', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

// Update a property by ID
const updateProperty = async (id, data) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(id, data, { new: true });
    if (!updatedProperty) {
      throw new AppError('Property not found for update', StatusCodes.NOT_FOUND);
    }
    return updatedProperty;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new AppError('Invalid property ID format', StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Failed to update property', StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Delete a property by ID
const deleteProperty = async (id) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      throw new AppError('Property not found for deletion', StatusCodes.NOT_FOUND);
    }
    return deletedProperty;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new AppError('Invalid property ID format', StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Failed to delete property', StatusCodes.INTERNAL_SERVER_ERROR);
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
