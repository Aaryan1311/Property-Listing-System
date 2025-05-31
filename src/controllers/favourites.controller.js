const favoriteService = require('../services/favourites.service');
const { StatusCodes } = require('http-status-codes');
const { getErrorResponse } = require('../utils/common/error-response');


const addFavorite = async (req, res) => {
  try {
    await favoriteService.addFavorite(req.user._id, req.params.propertyId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Property added to favorites',
    });
  } catch (error) {
    res.status(error.status || 500).json(
      getErrorResponse('Failed to add favorite', error.errors || [error.message])
    );
  }
};


const removeFavorite = async (req, res) => {
  try {
    await favoriteService.removeFavorite(req.user._id, req.params.propertyId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Property removed from favorites',
    });
  } catch (error) {
    res.status(500).json(getErrorResponse('Failed to remove favorite', [error.message]));
  }
};


const getFavorites = async (req, res) => {
  try {
    const favorites = await favoriteService.getFavorites(req.user._id);
    res.status(StatusCodes.OK).json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    res.status(500).json(getErrorResponse('Failed to get favorites', [error.message]));
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,
};
