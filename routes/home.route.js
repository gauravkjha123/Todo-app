const express = require('express')
const router = express.Router();
const {showTask,createTask,deleteTask} =require('../controllers/home.controller');

router.get('/',showTask);
router.post('/create',createTask);
router.post('/delete',deleteTask);


module.exports= router;