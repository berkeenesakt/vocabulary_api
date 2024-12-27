const express = require('express');
const router = express.Router();
const { exampleController } = require('../controllers/index');

// Define routes
router.get('/example', exampleController.getExample);
router.post('/example', exampleController.createExample);

// Export the router
module.exports = router;