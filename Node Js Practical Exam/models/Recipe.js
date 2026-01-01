const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    cookingTime: {
        type: String, // e.g., "45 mins"
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    category: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage'],
        default: 'Lunch',
        required: true
    },
    image: {
        type: String, // URL or path to image
        default: '/images/default-recipe.jpg'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
