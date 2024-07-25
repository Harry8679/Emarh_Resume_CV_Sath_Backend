const asyncHandler = require('express-async-handler');

const login = asyncHandler(async(req, res) => {
    res.send('Login Page API');
});

module.exports = { login };