'use strict';

const { loadEnvFile } = require('node:process');
loadEnvFile();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const hazardRoutes = require('./routes/hazards');
const categoriesRoutes = require('./routes/categories');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root endpoint - API Documentation
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes
app.use('/api', hazardRoutes);
app.use('/api', categoriesRoutes);

// Server + DB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to database!");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        })
    })
    .catch(() => {
        console.log("Connection failed")
    });
