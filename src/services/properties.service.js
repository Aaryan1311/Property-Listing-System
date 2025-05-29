const Property = require('../models/properties.model');
const AppError = require('../utils/error/app-error');
const { StatusCodes } = require('http-status-codes');

const createProperty = async (data) => {
    const response = await Property.create(data);
    // console.log(response);
    return response;
};

const getAllProperties = async () => {
    const response = await Property.find();
    if(!response){
            throw new AppError('No data found', StatusCodes.NOT_FOUND);
    }
    return response;
}
const getPropertyById = async (id) => {
    const response = await Property.findById(id);
    if(!response){
            throw new AppError('No data found', StatusCodes.NOT_FOUND);
    }
    return response;
}

const updateProperty = async (id, data) => {
    const response = await Property.findByIdAndUpdate(id, data, { new: true });
    if (!response) {
        throw new AppError('No data found', StatusCodes.NOT_FOUND);
    }
    return response;
}

const deleteProperty = async (id) => {
    const response = await Property.findByIdAndDelete(id);
    if(!response){
            throw new AppError('No data found', StatusCodes.NOT_FOUND);
    }
    return response;
}

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
