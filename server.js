const express = require("express");
const mongoose = require("mongoose")
// const morgan = require("morgan")
const dotenv = require('dotenv')
const {products} = require("./data")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")

const PORT = process.env.PORT || 3001;

const app = express();
// app.use(morgan('dev'))

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
app.use("/api/orders", orderRoute)

app.get("/products", (req, res) => {
  return res.json(products)
})

app.get("/products/:cat", (req, res) => {
  const {cat} = req.params
  const cat_products = products.filter((item) => {
    return item.universe === cat || item.gender === cat
  })    
  if(!cat_products) {
      return res.status(404).send('Product does not exist.')
  }
  return res.status(200).json(cat_products)
})

app.get("/singleProduct/:productId", (req, res) => {
  const {productId} = req.params;
  const singleProduct = products.find((product) => product.id === productId)
  if(!singleProduct) {
      return res.status(404).send('Product does not exist.')
  }
  return res.json(singleProduct)
})

// app.get("/marvel", (req, res) => {
//   const marvel_products = products.filter((item) => {
//     return item.universe === 'marvel'
//   })    
//   if(!marvel_products) {
//       return res.status(404).send('Product does not exist.')
//   }
//   return res.json(marvel_products)
// })

// app.get("/dc", (req, res) => {
//   const dc_products = products.filter((item) => {
//     return item.universe === 'dc'
//   })    
//   if(!dc_products) {
//       return res.status(404).send('Product does not exist.')
//   }
//   return res.json(dc_products)
// })


// app.get("/men", (req, res) => {
//   const men_products = products.filter((item) => {
//     return item.gender === 'men'
//   })    
//   if(!men_products) {
//       return res.status(404).send('Product does not exist.')
//   }
//   return res.json(men_products)
// })

// app.get("/women", (req, res) => {
//   const women_products = products.filter((item) => {
//     return item.gender === 'women'
//   })    
//   if(!women_products) {
//       return res.status(404).send('Product does not exist.')
//   }
//   return res.json(women_products)
// })
// app.get("/products/category/:gender", (req, res) => {
//   const {gender} = req.params;
//   const category_products = products.filter((item) => {
//     return item.gender === gender
//   })    
//   if(!category_products) {
//       return res.status(404).send('Product does not exist.')
//   }
//   return res.json(category_products)
// })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});