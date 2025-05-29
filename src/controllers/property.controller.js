const propertyService = require('../services/properties.service');
const { StatusCodes } = require('http-status-codes');

const createProperty = async (req, res, next) => {
  try {
    const propertyData = {
      ...req.body,
      createdBy: req.user._id
    };
    // console.log(propertyData);
    const newProperty = await propertyService.createProperty(propertyData);
    return res
    .status(StatusCodes.OK)
    .json({ success: true, data: newProperty });
  } catch (error) {
    next(error); 
  }
};


const getAllProperties = async (req, res, next) => {
  try {
    const response = await propertyService.getAllProperties();
    return res.status(StatusCodes.OK).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await propertyService.getPropertyById(id);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await propertyService.updateProperty(id, req.body);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Property updated successfully',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await propertyService.deleteProperty(id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Property deleted successfully',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
