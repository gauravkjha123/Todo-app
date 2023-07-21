const express = require('express')
const router = express.Router();
const homeController =require('../controllers/api/home.controller');

router.get('/',homeController.home);
router.post('/create',homeController.create);
router.use('/category',require('./category.route.js'))


module.exports= router;