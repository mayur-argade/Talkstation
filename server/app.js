const express = require('express') 
const app = express();
var morgan = require('morgan')

// morgan middleware
app.use(morgan('tiny'))

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// import all the routes here
const home = require('./routes/HomeRoute')
const auth = require('./routes/AuthRoute')

// router middleware
app.use('/api/v1', home)
app.use('/api/v1/auth', auth)

//export app.js
module.exports = app;
