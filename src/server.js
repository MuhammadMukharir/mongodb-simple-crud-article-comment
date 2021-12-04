// package
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// route
const blogRoute = require("./routes/blog");

// init express
const app = express();

// configure database and mongoose
const MONGODB_URL = "mongodb+srv://developer:thisismypassword@cluster0.r5gh9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

// registering cors
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// register route
app.use(blogRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});