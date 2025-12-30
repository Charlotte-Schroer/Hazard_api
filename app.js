'use strict';

const { loadEnvFile } = require('node:process');
loadEnvFile();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Hazard = require('./models/hazard.model');
const Category = require('./models/category.model');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root endpoint - API Documentation
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Hazards
app.get('/api/hazards', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const hazards = await Hazard.find({})
            .populate('category')
            .limit(limit)
            .skip(offset);

        const total = await Hazard.countDocuments();

        res.status(200).json({
            data: hazards,
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + hazards.length < total
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search hazards by name or description
app.get('/api/hazards/search', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ message: "Search query 'q' is required" });
        }

        const hazards = await Hazard.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        }).populate('category');

        res.status(200).json(hazards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/hazard/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const hazard = await Hazard.findById(id);
        res.status(200).json(hazard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/hazards', async (req, res) => {
    try {
        const hazard = await Hazard.create(req.body);
        res.status(200).json(hazard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update a hazard
app.put('/api/hazard/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const hazard = await Hazard.findByIdAndUpdate(id, req.body);

        if (!hazard) {
            return res.status(404).json({ message: "Hazard not found" });
        }

        const updatedHazard = await Hazard.findById(id);
        res.status(200).json(updatedHazard);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete a hazard
app.delete('/api/hazard/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const hazard = await Hazard.findByIdAndDelete(id);

        if (!hazard) {
            return res.status(404).json({ message: "Hazard not found" });
        }

        res.status(200).json({ message: "Hazard deleted succesfully" })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Categories

app.get('/api/categories', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const categories = await Category.find({})
            .limit(limit)
            .skip(offset);

        const total = await Category.countDocuments();

        res.status(200).json({
            data: categories,
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + categories.length < total
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search categories by name
app.get('/api/categories/search', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ message: "Search query 'q' is required" });
        }

        const categories = await Category.find({
            name: { $regex: q, $options: 'i' }
        });

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single category
app.get('/api/category/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a category
app.post('/api/categories', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a category
app.put('/api/category/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, req.body);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const updatedCategory = await Category.findById(id);
        res.status(200).json(updatedCategory);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a category
app.delete('/api/category/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
