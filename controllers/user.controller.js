const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler.util');
const { check, validationResult } = require('express-validator');

/** ------------------- Login -------------------- */
const login = asyncHandler(async(req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new ErrorHandler('Please enter username and password', 400));
    }

    // Find user in the database
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid username or password', 401));
    }

    res.send('Login successful');

});

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
    user.save();
    res.send('User created successfully');
});

module.exports = { login, register };

// /*----------------- Register an Account ----------------- */
// export const register = asyncHandler(async(req, res) => {
//     const { name, email, password } = req.body;

    
//     const user = await User.create({ name, email, password });

//     const token = user.getJwtToken();

//     // res.status(201).json({ token });
//     sendToken(user, 201, res);
// });

// /*----------------- Login ----------------- */
// export const loginUser = asyncHandler(async(req, res, next) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return next(new ErrorHandler('Please enter email and password', 400));
//     }

//     // Find user in the database
//     const user = await User.findOne({ email }).select('+password');

//     if (!user) {
//         return next(new ErrorHandler('Invalid email or password', 401));
//     }

//     // Check if password is correct
//     const isPasswordMatched = await user.comparePassword(password);

//     if (!isPasswordMatched) {
//         return next(new ErrorHandler('Invalid or password', 401));
//     }

//     sendToken(user, 200, res);
// });