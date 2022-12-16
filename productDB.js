require ("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product.js");
const productsJson = require("./products.json");

const start = async () => {
    try {
       mongoose
            .set('strictQuery', true)
            .connect(process.env.MONGO_URI)
        // await Product.deleteMany({});
        await Product.create(productsJson);
        console.log("success");
    } catch (error) {
        console.log(error);
    }
}

start();