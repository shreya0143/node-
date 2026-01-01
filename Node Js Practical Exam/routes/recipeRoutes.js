const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes (or with optional auth just for display)
router.get('/', authMiddleware.optionalAuth, recipeController.getAllRecipes);
router.get('/recipes', authMiddleware.optionalAuth, recipeController.getAllRecipes);
router.get('/search', authMiddleware.optionalAuth, recipeController.searchRecipes);
router.get('/recipes/:id', authMiddleware.optionalAuth, recipeController.getRecipe);

// Protected routes
router.use(authMiddleware.checkAuth);

router.get('/my-recipes', recipeController.getMyRecipes);
router.get('/create-recipe', recipeController.getCreateRecipe);
router.post('/create-recipe', recipeController.createRecipe);

router.get('/recipes/edit/:id', recipeController.getEditRecipe);
router.post('/recipes/edit/:id', recipeController.updateRecipe); // Using POST for form simplicity (method override can be added later)
router.post('/recipes/delete/:id', recipeController.deleteRecipe);

router.post('/recipes/:id/comment', recipeController.postComment);
router.post('/recipes/:id/favorite', recipeController.toggleFavorite);
router.get('/my-favorites', recipeController.getMyFavorites);

module.exports = router;
