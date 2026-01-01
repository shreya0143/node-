const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key'; // In prod, use .env

exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', { error: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            username,
            password: hashedPassword,
            role: role || 'user'
        });

        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.render('register', { error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check user
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { error: 'Invalid username or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid username or password' });
        }

        // Generate Token
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set Cookie
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, // Enable in production with HTTPS
            maxAge: 3600000 // 1 hour
        });

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('login', { error: 'Login failed' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

exports.getRegister = (req, res) => {
    res.render('register', { error: null });
};

exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};
