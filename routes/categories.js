'use strict'

const express = require('express');
const router = express.Router();
const Category = require('./models/category.model');

// Get categories
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

module.exports = router;