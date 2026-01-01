const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
