const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const recommendationController = require('../../controllers/recommendation.controller');

router.post('/', authMiddleware, recommendationController.recommendProperty);
router.get('/', authMiddleware, recommendationController.getRecommendations);

module.exports = router;
