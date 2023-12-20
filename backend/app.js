const express = require("express");
const app = express();

const errorMiddleware = require("./middlewares/error");

app.use(express.json());
// routes
const products = require("./routes/productRoute");
const user = require("./routes/userRoutes");
app.use("/api",products);
app.use("/api",user);

app.use(errorMiddleware);


module.exports = app;