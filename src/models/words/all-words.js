const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const wordSchema = new mongoose.Schema({
    _id: ObjectId,
    word: String,
    pronunciation: String,
    meaning: String,
    example: String,
    level: String
});

module.exports = mongoose.model('Word', wordSchema, 'words');