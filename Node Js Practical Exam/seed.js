const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Recipe = require('./models/Recipe');

dotenv.config();

const mongoURI = 'mongodb://127.0.0.1:27017/recipePlatform';

const seedData = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB for seeding');

        // Check if user exists
        let user = await User.findOne({ username: 'testuser' });

        if (!user) {
            console.log('Creating test user...');
            const hashedPassword = await bcrypt.hash('password123', 10);
            user = new User({
                username: 'testuser',
                password: hashedPassword,
                role: 'user'
            });
            await user.save();
            console.log('Test user created: testuser / password123');
        } else {
            console.log('Test user already exists.');
        }

        // Create Recipes
        const recipes = [
            {
                title: 'Pasta Carbonara',
                ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Black Pepper'],
                instructions: '1. Cook pasta. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all with pasta water.',
                cookingTime: '20 mins',
                difficulty: 'Medium',
                image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
                createdBy: user._id
            },
            {
                title: 'Mango Smoothie',
                ingredients: ['Fresh Mango', 'Yogurt', 'Honey', 'Ice Cubes'],
                instructions: '1. Peel and chop mango. 2. Blend with yogurt, honey and ice. 3. Serve chilled.',
                cookingTime: '5 mins',
                difficulty: 'Easy',
                image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80',
                createdBy: user._id
            }
        ];

        for (const recipeData of recipes) {
            // Check if recipe with same title exists to avoid duplicates on multiple runs
            const existingRecipe = await Recipe.findOne({ title: recipeData.title });
            if (!existingRecipe) {
                const newRecipe = new Recipe(recipeData);
                await newRecipe.save();
                // Add to user's recipes
                await User.findByIdAndUpdate(user._id, { $push: { recipes: newRecipe._id } });
                console.log(`Recipe added: ${recipeData.title}`);
            } else {
                console.log(`Recipe already exists: ${recipeData.title}`);
            }
        }

        console.log('Seeding completed successfully.');
        process.exit(0);

    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
