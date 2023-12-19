const express = require("express");
const app = express();

const errorMiddleware = require("./middlewares/error");

app.use(express.json());
// routes
const products = require("./routes/productRoute");
app.use("/api",products)

app.use(errorMiddleware);


module.exports = app;