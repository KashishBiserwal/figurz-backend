const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        id: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        category: {type: Array, required: true},
        price: {type: Number, required: true},
        img1: {type: String, required: true},
        img2: {type: String},
        img3: {type: String},
        img4: {type: String},
        stock: {type: Number },
        sizes: {type: Array },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);