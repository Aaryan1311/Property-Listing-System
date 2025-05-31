const recommendationService = require('../services/recommendation.service');
const { StatusCodes } = require('http-status-codes');
const { getErrorResponse } = require('../utils/common/error-response');

const recommendProperty = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { recipientEmail, propertyId } = req.body;

    await recommendationService.recommendProperty(senderId, recipientEmail, propertyId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Property recommended successfully',
    });
  } catch (error) {
    res.status(error.status || 500).json(
      getErrorResponse('Failed to recommend property', error.errors || [error.message])
    );
  }
};

const getRecommendations = async (req, res) => {
  try {
    const recommendations = await recommendationService.getRecommendations(req.user._id);

    res.status(StatusCodes.OK).json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    res.status(500).json(
      getErrorResponse('Failed to get recommendations', [error.message])
    );
  }
};

module.exports = {
  recommendProperty,
  getRecommendations,
};
