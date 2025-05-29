const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes')
const { InfoController } = require('../../controllers');

router.get('/info', InfoController.info);
router.use('/auth',authRoutes);


module.exports = router;