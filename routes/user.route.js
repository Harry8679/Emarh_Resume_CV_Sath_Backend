const express = require('express');
const { login, register } = require('../controllers/user.controller');
const app = express();

const userRoute = express.Router();
const { check } = require('express-validator');

userRoute.post('/login', login);
userRoute.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password should have at least 5 characters').isLength({ min: 5 })
], register);

module.exports = userRoute;