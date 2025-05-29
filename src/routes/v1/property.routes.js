const express = require('express');
const propertyController = require('../../controllers/property.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { validateCreateRequest, isPropertyOwner }  = require('../../middlewares/property.middleware');

const router = express.Router();

//CREATE
router.post('/',
    authMiddleware, validateCreateRequest, propertyController.createProperty
)

//GET
router.get('/',
    propertyController.getAllProperties
)

//GET BY ID
router.get('/:id',
    propertyController.getPropertyById
)

//UPDATE
router.put('/:id', 
    authMiddleware, isPropertyOwner, propertyController.updateProperty);

//DELETE
router.delete('/:id', 
    authMiddleware, isPropertyOwner, propertyController.deleteProperty);


module.exports = router;
