const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/user.route');
dotenv.config();

// Middleware to parse body
app.use(express.json());
const port = process.env.PORT || 4000;

connectDB();

app.use('/api/v1/users', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})