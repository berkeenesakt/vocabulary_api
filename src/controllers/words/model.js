const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    id: String,
    word: String,
    pronunciation: String,
    example: String,
    level: String
});

module.exports = mongoose.model('Word', wordSchema, 'words');