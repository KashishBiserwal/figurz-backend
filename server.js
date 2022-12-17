const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")

const PORT = process.env.PORT || 3001;

const app = express();

dotenv.config();

mongoose
  .set('strictQuery', true)
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connection Succesful"))
  .catch((err) => {
    console.log(err);
  });
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)


app.get("/", (req, res) => {
  res.status(200).send("Express api on vercel.")
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;