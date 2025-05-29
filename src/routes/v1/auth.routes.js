const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../../middlewares/');

router.post('/signup', registerValidation, signUp);
router.post('/signin', loginValidation, signIn);

module.exports = router;