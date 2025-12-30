const mongoose = require('mongoose');

const HazardSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the hazard name"],
            validate: {
                validator: function (v) {
                    return !/\d/.test(v);
                },
                message: "Name cannot contain numbers"
            }
        },

        description: {
            type: String,
            required: [true, "Please enter the hazard description"]
        },

        severity: {
            type: Number,
            required: [true, "Please enter severity (1-5)"],
            min: [1, "Severity must be at least 1"],
            max: [5, "Severity cannot exceed 5"]
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, "Please select a category"]
        }
    },
    {
        timestamps: true
    }
);

const Hazard = mongoose.model("Hazard", HazardSchema);

module.exports = Hazard;