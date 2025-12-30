'use strict';

const express = require('express');
const router = express.Router();
const Hazard = require('./models/hazard.model');

// Get hazards
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

// Get a single hazard
app.get('/api/hazard/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const hazard = await Hazard.findById(id);
        res.status(200).json(hazard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a hazard
app.post('/api/hazards', async (req, res) => {
    try {
        const hazard = await Hazard.create(req.body);
        res.status(200).json(hazard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a hazard
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

// Delete a hazard
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

module.exports = router;