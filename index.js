const express = require('express')
const app = express()
const path =require('path')

require('./config/db');
require('dotenv').config()
const port=process.env.PORT || 3000;


//Parse request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Server static files
app.use(express.static("public"))

//Set view engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

//Api Routes
app.use("/",require('./routes/home.route'));

app.listen(port,()=>{
    console.log("server is running on port", port);
})

