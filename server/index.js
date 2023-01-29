const app = require('./app') //importing app 
require('dotenv').config();  
const connectdb = require('./config/connectdb');

// database connection
connectdb();

//creating basic server
app.listen(process.env.PORT, ()=>{
    console.log(`server is running at port: ${process.env.PORT}`);
})
