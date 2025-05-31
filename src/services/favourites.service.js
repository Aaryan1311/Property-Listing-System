const User = require('../models/user.model');
const Property = require('../models/properties.model');
const AppError = require('../utils/error/app-error');
const { StatusCodes } = require('http-status-codes');

const addFavorite = async (userId, propertyId) => {
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new AppError(['Property not found'], StatusCodes.NOT_FOUND);
  }

  const user = await User.findById(userId);
  if (!user.favorites.includes(propertyId)) {
    user.favorites.push(propertyId);
    await user.save();
  }
};

const removeFavorite = async (userId, propertyId) => {
  await User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: propertyId } },
    { new: true }
  );
};

const getFavorites = async (userId) => {
  const user = await User.findById(userId).populate('favorites');
  return user.favorites;
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,
};
