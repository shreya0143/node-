const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const authMiddleware = require('./middleware/authMiddleware');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Global User Middleware for Views
app.use((req, res, next) => {
    res.locals.user = null; // Default to null
    next();
});
app.use(authMiddleware.optionalAuth); // Try to decode token for all routes (navbar needs it)

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

app.use(authRoutes);
app.use(recipeRoutes);

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/recipePlatform')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
