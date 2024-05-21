// Creating a model.
// A model is something that we can use to store data into our database.
// We will store some products.

const mongoose = require("mongoose");

// We provide an object (purple braces), showing the fields in the DB
// timestamps helps us have 2 more fields: "created at" and "updated at"
const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            requried: [true, "Please enter product name"],
        },

        quantity: {
            type: Number,
            required: true,
            default: 0,
        },

        price: {
            type: Number,
            requried: true,
            default: 0,
        },

        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
