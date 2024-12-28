const mongoose = require('mongoose');
const wordSchema = require('./all-words');

const userWordSchema = new mongoose.Schema({
    uid: String,
    seenWords: [wordSchema],
    savedWords: [wordSchema],
});

module.exports = mongoose.model('userWord', userWordSchema, 'user_words');