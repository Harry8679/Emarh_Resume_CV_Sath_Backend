const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        res.status(401).json({ msg: 'You don\'t have  the right authorization' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};