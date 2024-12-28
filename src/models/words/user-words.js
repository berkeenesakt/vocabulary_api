const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    
});

module.exports = mongoose.model('userWord', wordSchema, 'user_words');