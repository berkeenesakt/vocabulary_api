const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const parameters = {
    _id: ObjectId,
    word: String,
    pronunciation: String,
    meaning: String,
    example: String,
    level: String
};

const userWordSchema = new mongoose.Schema({
    uid: ObjectId,
    seenWords: [parameters],
    favoriteWords: [parameters]
});

module.exports = mongoose.model('userWord', userWordSchema, 'user_words');