const User = require('../models/user.model');
const Property = require('../models/properties.model');
const AppError = require('../utils/error/app-error');
const  { StatusCodes } = require('http-status-codes');

const recommendProperty = async (senderId, receiverEmail, propertyId) => {
    const receiver = await User.findOne({email: receiverEmail});
    if(!receiver){
        throw new AppError(['Recipient not found'], StatusCodes.NOT_FOUND);
    }
    const property = await Property.findById(propertyId);
    if (!property) {
        throw new AppError(['Property not found'], StatusCodes.NOT_FOUND);
    }
    receiver.recommendationsReceived.push({
        property: propertyId,
        recommendedBy: senderId,
    });

    await receiver.save();
}

const getRecommendations = async (userId) => {
  const user = await User.findById(userId).populate({
    path: 'recommendationsReceived.property recommendationsReceived.recommendedBy',
    select: 'name email',
  });

  return user.recommendationsReceived;
};

module.exports = {
    getRecommendations,
    recommendProperty
}