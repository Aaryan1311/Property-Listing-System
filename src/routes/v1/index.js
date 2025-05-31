const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const propertyRoutes = require('./property.routes');
const recommendationRoutes = require('./recommendation.routes');
const favouriteRoutes = require('./favourites.routes');
const { InfoController } = require('../../controllers');

router.get('/info', InfoController.info);
router.use('/auth',authRoutes);
router.use('/properties', propertyRoutes);
router.use('/favourites', favouriteRoutes);
router.use('/recommendation', recommendationRoutes);


module.exports = router;