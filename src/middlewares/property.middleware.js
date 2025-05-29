const Property = require('../models/properties.model');
const AppError = require('../utils/error/app-error');
const { ErrorResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');


function validateCreateRequest(req,res,next){
    if(!req.body){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( ['Required field cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }
    if(!req.body.id){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( ['Id is required in the request body in correct format'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.title){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `Title cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.type){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `Type cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.price){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `Price cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }


    if(!req.body.state){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `State cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }


    if(!req.body.city){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `City cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }


    if(!req.body.areaSqft){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `Area cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }


    if(!req.body.bedrooms){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `Bedrooms cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }


    if(!req.body.bathrooms){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `Bathrooms cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }


    if(!req.body.furnished){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `Furnished status cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }


    if(!req.body.availableFrom){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `Availability date cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }


    if(!req.body.listedBy){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `Listed By cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }


    if(!req.body.colorTheme){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `Color Theme cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.listingType){
        ErrorResponse.message = 'Something went wrong in listing property';
        ErrorResponse.error = new AppError( [ `Listing Type cannot be null `], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }
    next();
}


async function isPropertyOwner(req, res, next) {
  try {
    const propertyId = req.params.id;
    const userId = req.user._id;

    const property = await Property.findById(propertyId); // ✅ await is required

    if (!property) {
      return next(new AppError('Property not found', StatusCodes.NOT_FOUND));
    }

    if (property.createdBy.toString() !== userId.toString()) {
      return next(
        new AppError('You are not authorized to modify this property', StatusCodes.FORBIDDEN)
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
