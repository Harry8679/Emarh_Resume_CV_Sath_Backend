const express = require('express');
const User = require('../models/user.model');
const { login } = require('../controllers/user.controller');
const app = express();

const userRoute = express.Router();

userRoute.get('/login', login);

module.exports = userRoute;