const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const User = require('../models/User');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('createdBy', 'username');
        res.render('recipeList', { recipes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.searchRecipes = async (req, res) => {
    try {
        const query = req.query.q;
        console.log('Search Query Received:', query); // Debug log
        let recipes = [];
        if (query) {
            // Fuzzy search in title or ingredients (case-insensitive)
            recipes = await Recipe.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { ingredients: { $regex: query, $options: 'i' } }
                ]
            }).populate('createdBy', 'username');
        }
        res.render('recipeList', { recipes, searchQuery: query });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.getMyRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ createdBy: req.user.id });
        res.render('myRecipes', { recipes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.getCreateRecipe = (req, res) => {
    res.render('recipeForm', { recipe: null }); // null for create mode
};

exports.createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, cookingTime, difficulty, category, image } = req.body;

        // Parse ingredients string to array if needed (simplified for text area input)
        const ingredientsArray = ingredients.split('\n').map(item => item.trim()).filter(item => item !== '');

        const newRecipe = new Recipe({
            title,
            ingredients: ingredientsArray,
            instructions,
            cookingTime,
            difficulty,
            category,
            image: image || '/images/default-recipe.jpg',
            createdBy: req.user.id
        });

        await newRecipe.save();

        // Add to user's recipe list
        await User.findByIdAndUpdate(req.user.id, { $push: { recipes: newRecipe._id } });

        res.redirect('/my-recipes');
    } catch (error) {
        console.error(error);
        res.render('recipeForm', { recipe: req.body, error: 'Error creating recipe' });
    }
};

exports.getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'username');
        constcomments = await Comment.find({ recipeId: req.params.id }).populate('userId', 'username');

        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        res.render('recipeItem', { recipe, comments });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.getEditRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        // Check ownership or admin
        if (recipe.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).send('Unauthorized');
        }

        res.render('recipeForm', { recipe });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, cookingTime, difficulty, category, image } = req.body;
        const ingredientsArray = ingredients.split('\n').map(item => item.trim()).filter(item => item !== '');

        let recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        if (recipe.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).send('Unauthorized');
        }

        recipe.title = title;
        recipe.ingredients = ingredientsArray;
        recipe.instructions = instructions;
        recipe.cookingTime = cookingTime;
        recipe.difficulty = difficulty;
        recipe.category = category;
        if (image) recipe.image = image;

        await recipe.save();
        res.redirect(`/recipes/${recipe._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        if (recipe.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).send('Unauthorized');
        }

        await Recipe.findByIdAndDelete(req.params.id);

        // Remove from user's recipe list
        await User.findByIdAndUpdate(req.user.id, { $pull: { recipes: req.params.id } });

        res.redirect('/my-recipes');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.postComment = async (req, res) => {
    try {
        const { content } = req.body;
        const newComment = new Comment({
            content,
            recipeId: req.params.id,
            userId: req.user.id
        });
        await newComment.save();
        res.redirect(`/recipes/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.toggleFavorite = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const user = await User.findById(req.user.id);

        console.log('Toggling Favorite. Recipe:', recipeId, 'User:', user.username);
        console.log('Current Favorites:', user.favorites);

        // check if already favorite
        const isFavorite = user.favorites.some(id => id.toString() === recipeId);
        console.log('Is Favorite?', isFavorite);

        if (isFavorite) {
            await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: recipeId } });
            console.log('Removed.');
        } else {
            await User.findByIdAndUpdate(req.user.id, { $push: { favorites: recipeId } });
            console.log('Added.');
        }

        res.redirect(req.get('referer'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.getMyFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorites');
        res.render('myRecipes', { recipes: user.favorites, isFavoritesPage: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

