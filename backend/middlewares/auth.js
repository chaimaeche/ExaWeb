const jwt = require('jsonwebtoken');

// middlewares/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Non autorisé' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(400).json({ message: 'Token invalide' });
    }
};
