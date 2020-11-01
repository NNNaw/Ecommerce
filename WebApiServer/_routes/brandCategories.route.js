var express = require('express')
var router = express.Router()

var controller = require('../_controllers/brandCategories.controller');
// const verify = require('./verifyToken')



// define the home page route
router.get('/:Id_Category', controller.GetByIdCategory);
// router.get('/:Id_Brand', controller.GetByIdBrand);




module.exports = router