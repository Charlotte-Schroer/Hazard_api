const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the category name"],
            unique: true,
            validate: {
                validator: function (v) {
                    return !/\d/.test(v);
                },
                message: "Name cannot contain numbers"
            }
        },

        description: {
            type: String,
            required: [true, "Please enter the category description"]
        },

        color: {
            type: String,
            default: "#FF0000"
        }
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
