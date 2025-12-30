'use strict';

const { loadEnvFile } = require('node:process');
loadEnvFile();

const express = require('express');
const mongoose = require('mongoose');
const Hazard = require('./models/hazard.model')
const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send("")
});

app.get('/api/hazards', async (req, res) => {
    try {
        const hazards = await Hazard.find({});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/hazard/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const hazard = await Hazard.findById(id);
        res.status(200).json(hazard);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/hazards', async (req, res) => {
    try {
        const hazard = await Hazard.create(req.body);
        res.status(200).json(hazard);
    } catch (error){
        res.status(500).json({message: error.message});
    }
});

//update a hazard
app.put('/api/hazard/:id', async(req, res) =>{
    try {
        const { id } = req.params;
        const hazard = await Hazard.findByIdAndUpdate(id, req.body);

        if (!hazard) {
            return res.status(404).json({message: "Hazard not found"});
        }

       const updatedHazard =  await Hazard.findById(id);
       res.status(200).json(updatedHazard);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//delete a hazard
app.delete('/api/hazard/:id', async (req, res) => {
    try {
        const { id} = req.params;

        const hazard = await Hazard.findByIdAndDelete(id);

        if (!hazard) {
            return res.status(404).json({message: "Hazard not found"});
        }

        res.status(200).json({message: "Hazard deleted succesfully"})

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.connect(process.env.MONGODB_URI)
.then(() =>{
    console.log("Connected to database!");
    app.listen(3000, () =>{
    console.log("Server is running on port 3000");
})
})
.catch(() =>{
    console.log("Connection failed")
});
