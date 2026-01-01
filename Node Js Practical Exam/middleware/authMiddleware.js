const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

exports.checkAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const User = require('../models/User'); // Lazy load to avoid circular dependency
        const user = await User.findById(decoded.id);

        if (!user) {
            res.clearCookie('token');
            return res.redirect('/login');
        }

        req.user = user;
        res.locals.user = user;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

exports.checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            // Can render a 403 Forbidden page or redirect
            return res.status(403).send('Access denied');
        }
        next();
    };
};

// Middleware to check auth but not redirect (for conditional rendering in public pages)
exports.optionalAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const User = require('../models/User');
            const user = await User.findById(decoded.id);
            if (user) {
                req.user = user;
                res.locals.user = user;
            }
        } catch (error) {
            // Invalid token, just ignore
        }
    }
    next();
};
