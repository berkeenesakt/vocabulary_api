const UserWord = require('../../models/words/user-words');
const Word = require('../../models/words/all-words');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
//const ObjectId = mongoose.Types.ObjectId;

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// Get all favorite words
const getFavoriteWords = async (req, res) => {
    try {
        const userWords = await UserWord.findOne({ uid: req.user.userId });
        if (!userWords) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userWords.favoriteWords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add word to favorites
const addFavoriteWord = async (req, res) => {
    try {
        const _id = req.body._id;
        if (!_id) {
            return res.status(400).json({ message: 'Word ID is required' });
        }

        //const objectId = new ObjectId(_id);

        // Find word in words collection
        const wordToAdd = Word.findById(_id);
        if (!wordToAdd) {
            return res.status(404).json({ message: 'Word not found' });
        }

        // Find or create user words document
        let userWords = await UserWord.findOne({ uid: req.user.userId });
        if (!userWords) {
            userWords = new UserWord({
                uid: req.user.userId,
                seenWords: [],
                favoriteWords: []
            });
        }

        // Check if word already exists in savedWords
        const wordExists = userWords.favoriteWords.some(word => word._id === _id);
        if (wordExists) {
            return res.status(400).json({ message: 'Word already in favorites' });
        }

        userWords.favoriteWords.push(wordToAdd);
        await userWords.save();
        res.status(200).json(userWords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete word from favorites
const deleteFavoriteWord = async (req, res) => {
    try {
        const _id = req.body._id;
        if (!_id) {
            return res.status(400).json({ message: 'Word ID is required' });
        }

        const userWords = await UserWord.findOne({ uid: req.user.userId });
        if (!userWords) {
            return res.status(404).json({ message: 'User not found' });
        }

        if(!userWords.favoriteWords.filter(word => word._id === _id)){
            return res.status(404).json({ message: 'Word not found among user\'s favorite words' });
        }

        userWords.favoriteWords = userWords.favoriteWords.filter(word => word._id !== _id);
        await userWords.save();
        res.status(200).json(userWords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    authenticateToken,
    getFavoriteWords,
    addFavoriteWord,
    deleteFavoriteWord
};