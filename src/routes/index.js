const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');
const markWordAsSeen = require('../controllers/words/seen');
const wordController = require('./word');

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);
router.use('/random', wordController);

router.post('/seen/:wordId', auth, markWordAsSeen);

// Export the router
module.exports = router;