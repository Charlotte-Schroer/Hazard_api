'use strict';

const mongoose = require('mongoose');
const { loadEnvFile } = require('node:process');
loadEnvFile();

const Hazard = require('./models/hazard.model');
const Category = require('./models/category.model');

const categories = [
    {
        name: "Fire Hazard",
        description: "Hazards related to fires, explosions, and flammable materials.",
        color: "#FF4500"
    },
    {
        name: "Chemical Hazard",
        description: "Risks caused by exposure to hazardous chemicals, gases, or toxic substances.",
        color: "#8B0000"
    },
    {
        name: "Electrical Hazard",
        description: "Dangers associated with electrical equipment, wiring, and power sources.",
        color: "#FFD700"
    },
    {
        name: "Biological Hazard",
        description: "Health risks from bacteria, viruses, fungi, or other biological agents.",
        color: "#228B22"
    },
    {
        name: "Radiation Hazard",
        description: "Exposure risks from radioactive materials or radiation-emitting equipment.",
        color: "#9400D3"
    },
    {
        name: "Physical Hazard",
        description: "Injuries caused by slips, trips, falls, noise, or moving machinery.",
        color: "#4682B4"
    },
    {
        name: "Ergonomic Hazard",
        description: "Risks resulting from poor posture, repetitive movements, or improper workstation setup.",
        color: "#20B2AA"
    },
    {
        name: "Environmental Hazard",
        description: "Hazards that impact the environment such as pollution, waste, or climate-related risks.",
        color: "#2E8B57"
    }
];

const seedData = async () => {
    try {
        console.log("Connecting to database...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database!");

        // Clear existing data
        console.log("Clearing existing data...");
        await Hazard.deleteMany({});
        await Category.deleteMany({});

        // Seed Categories
        console.log("Seeding categories...");
        const createdCategories = await Category.insertMany(categories);
        console.log(`${createdCategories.length} categories seeded.`);

        // Helper to find category ID by name
        const getCatId = (name) => createdCategories.find(c => c.name === name)._id;

        // Seed Hazards
        console.log("Seeding hazards...");
        const hazards = [
            {
                name: "Open Flame Exposure",
                description: "Risk of burns or fire caused by uncontrolled open flames in the workplace.",
                severity: 5,
                category: getCatId("Fire Hazard")
            },
            {
                name: "Flammable Material Storage",
                description: "Improper storage of flammable materials increasing the risk of ignition.",
                severity: 4,
                category: getCatId("Fire Hazard")
            },

            // Chemical Hazards
            {
                name: "Toxic Chemical Spill",
                description: "Exposure to harmful chemicals due to accidental spills or leaks.",
                severity: 5,
                category: getCatId("Chemical Hazard")
            },
            {
                name: "Corrosive Substance Handling",
                description: "Skin or eye injuries from improper handling of corrosive substances.",
                severity: 4,
                category: getCatId("Chemical Hazard")
            },

            // Electrical Hazards
            {
                name: "Exposed Electrical Wiring",
                description: "Risk of electric shock due to damaged or exposed wiring.",
                severity: 5,
                category: getCatId("Electrical Hazard")
            },
            {
                name: "Overloaded Power Circuits",
                description: "Fire or shock hazard caused by excessive electrical load on circuits.",
                severity: 4,
                category: getCatId("Electrical Hazard")
            },

            // Biological Hazards
            {
                name: "Airborne Pathogen Exposure",
                description: "Risk of illness from inhalation of airborne biological agents.",
                severity: 4,
                category: getCatId("Biological Hazard")
            },
            {
                name: "Contaminated Waste Handling",
                description: "Exposure to infectious materials during waste disposal.",
                severity: 3,
                category: getCatId("Biological Hazard")
            },

            // Radiation Hazards
            {
                name: "Ionizing Radiation Exposure",
                description: "Health risks from prolonged exposure to ionizing radiation sources.",
                severity: 5,
                category: getCatId("Radiation Hazard")
            },
            {
                name: "Unshielded Radiation Equipment",
                description: "Radiation exposure due to inadequate shielding on equipment.",
                severity: 4,
                category: getCatId("Radiation Hazard")
            },

            // Physical Hazards
            {
                name: "Slippery Floor Surface",
                description: "Risk of slips and falls caused by wet or uneven flooring.",
                severity: 3,
                category: getCatId("Physical Hazard")
            },
            {
                name: "Moving Machinery Parts",
                description: "Injury risk from contact with unguarded moving machinery.",
                severity: 5,
                category: getCatId("Physical Hazard")
            },

            // Ergonomic Hazards
            {
                name: "Repetitive Motion Strain",
                description: "Muscle or joint injuries caused by repetitive movements over time.",
                severity: 3,
                category: getCatId("Ergonomic Hazard")
            },
            {
                name: "Improper Workstation Setup",
                description: "Back and neck strain caused by poorly designed workstations.",
                severity: 2,
                category: getCatId("Ergonomic Hazard")
            },

            // Environmental Hazards
            {
                name: "Air Pollution Exposure",
                description: "Health risks caused by prolonged exposure to polluted air.",
                severity: 4,
                category: getCatId("Environmental Hazard")
            },
            {
                name: "Improper Waste Disposal",
                description: "Environmental contamination due to unsafe waste disposal practices.",
                severity: 3,
                category: getCatId("Environmental Hazard")
            }
        ];

        const createdHazards = await Hazard.insertMany(hazards);
        console.log(`${createdHazards.length} hazards seeded.`);

        console.log("Database seeded successfully! 🎉");
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedData();
