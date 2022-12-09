const express = require("express");
const mongoose = require("mongoose")
const dotenv = require('dotenv')
// const {products} = require("./data")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")

const PORT = process.env.PORT || 3001;

const app = express();

dotenv.config();

mongoose
  .set('strictQuery', true)
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Succesful"))
  .catch((err) => {
    console.log(err);
  });
app.use(express.json())
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)

app.get("/", (req, res) => {
  res.status(200).send("Express api on vercel.")
})
// app.get("/products/:cat", (req, res) => {
//   const {cat} = req.params
//   const cat_products = products.filter((item) => {
//     return item.universe === cat || item.gender === cat
//   })    
//   if(!cat_products) {
//       return res.status(404).send('Product does not exist.')
//   }
//   return res.status(200).json(cat_products)
// })

// app.get("/singleProduct/:productId", (req, res) => {
//   const {productId} = req.params;
//   const singleProduct = products.find((product) => product.id === productId)
//   if(!singleProduct) {
//       return res.status(404).send('Product does not exist.')
//   }
//   return res.json(singleProduct)
// })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;