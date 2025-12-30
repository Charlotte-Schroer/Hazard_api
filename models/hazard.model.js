const mongoose = require('mongoose');

const HazardSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the hazard name"]
        },

        description: {
            type: String,
            required: [true, "Please enter the hazard description"]
        },

    },
    {
        Timestamps: true,
    }
);

const Hazard = mongoose.model("Hazard", HazardSchema);

module.exports = Hazard;