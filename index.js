const express = require('express')
const app = express()
const path =require('path')
const config=require('./config/db');
require('dotenv').config()
const port=process.env.PORT || 3000;

//server static files
app.use(express.static("public"))

//Set view engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

//Api Routes
app.use("/",require('./routes/home.route'));

app.listen(port,()=>{
    console.log("server is running on port", port);
})

