require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Food Delivery API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));