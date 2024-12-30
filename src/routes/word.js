const express = require('express');
const router = express.Router();
const getRandomWord = require('../controllers/words/random-select');
const { authenticateToken, getFavoriteWords, addFavoriteWord, deleteFavoriteWord } = require('../controllers/words/favorite');


// Auth routes
router.get('/random', getRandomWord);

//Favorite routes (with bearer token authentication)
router.post('/favorite', authenticateToken, addFavoriteWord);
router.get('/favorite', authenticateToken, getFavoriteWords);
router.delete('/favorite', authenticateToken, deleteFavoriteWord);

// Export the router
module.exports = router;