const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Explicitly define collection name
const MODEL_NAME = 'User';
const COLLECTION_NAME = 'users';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

// Check if model already exists to prevent duplicate model error
module.exports = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, userSchema);