const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');

dotenv.config();

const port = process.env.PORT || 4000;

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})