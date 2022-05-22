const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

const api = process.env.API_URL;
//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//Routers
const productsRouter = require("./routers/products");
app.use(`${api}/products`, productsRouter);
const categoriesRouter = require("./routers/categories");
app.use(`${api}/categories`, categoriesRouter);
const usersRouter = require("./routers/users");
app.use(`${api}/users`, usersRouter);
const ordersRouter = require("./routers/orders");
app.use(`${api}/orders`, ordersRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

  //Development
  app.listen(3000, () => {
  console.log("server is running");

  var server = app.listen(process.env.PORT || 3000, function () {
      var port = server.address().port;
      console.log("Express is working on port" + port)
  })  




});
