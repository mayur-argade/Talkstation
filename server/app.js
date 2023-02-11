const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser')

// morgan middleware
app.use(morgan("tiny"));

// regular middlewares
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
app.use(express.json({limit: '8mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// import all the routes here
const home = require("./routes/HomeRoute");
const auth = require("./routes/AuthRoute");

// router middleware
app.use("/api/v1", home);
app.use("/api/v1/auth", auth);

//export app.js
module.exports = app;
