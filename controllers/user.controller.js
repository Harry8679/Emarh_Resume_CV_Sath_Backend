const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler.util');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/** ------------------- Login -------------------- */
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });

        if (!user) {
            console.log(user);
            return res.status(400).json({ errors: [{ msg: 'Invalid username or password' }] });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ errors: [{ msg: 'Invalid username or password' }] });
        }

        const payload = {
            user: {
                id: user.id,
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 * 24 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch(error) {
        console.log(error);
    }
}

/** ------------------- Register -------------------- */
const register = asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    let user = await User.findOne({ username: username });

    if (user) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    user = new User({ username, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.save();

    const payload = {
        user: {
            id: user.id,
        }
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 * 24 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
    });
});

module.exports = { login, register };