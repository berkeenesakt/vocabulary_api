const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// Export the router
module.exports = router;