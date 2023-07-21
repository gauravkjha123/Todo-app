const express = require('express')
const router = express.Router();
const category=require("../controllers/api/category.controller")

router.get("/",category);
module.exports=router;