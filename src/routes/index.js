const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const wordController = require('./word');

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);
router.use('/word', wordController);

// Export the router
module.exports = router;