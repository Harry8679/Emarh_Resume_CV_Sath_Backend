const express = require('express');
const User = require('../models/user.model');
const app = express();

const userRoute = express.Router();

userRoute.get('/login', (req, res) => {
    res.send('Login successful');
});

module.exports = userRoute;