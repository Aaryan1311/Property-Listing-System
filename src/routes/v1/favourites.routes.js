const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const favoriteController = require('../../controllers/favourites.controller');

router.post('/:propertyId', authMiddleware, favoriteController.addFavorite);
router.delete('/:propertyId', authMiddleware, favoriteController.removeFavorite);
router.get('/', authMiddleware, favoriteController.getFavorites);

module.exports = router;
