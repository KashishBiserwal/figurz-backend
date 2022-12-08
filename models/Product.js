const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        id: {type: String, required: true, unique: true},
        category: {type: Array, required: true},
        img1: {type: String, required: true},
        img2: {type: String, required: true},
        img3: {type: String, required: true},
        img4: {type: String, required: true},
        sizes: {type: Array },
        stock: {type: Number },
        price: {type: Number, required: true} 
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);