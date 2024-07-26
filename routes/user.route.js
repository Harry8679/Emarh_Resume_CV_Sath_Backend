const express = require('express');
const User = require('../models/user.model');
const { login, register } = require('../controllers/user.controller');
const app = express();

const userRoute = express.Router();

userRoute.post('/login', login);
userRoute.post('/register', register);

module.exports = userRoute;