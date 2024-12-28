const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { getRandomWord } = require('../controllers/words/random-select');

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/random', getRandomWord);

// Export the router
module.exports = router;