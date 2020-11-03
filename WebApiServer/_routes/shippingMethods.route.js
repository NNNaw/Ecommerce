var express = require('express')
var router = express.Router()
var controller = require('../_controllers/shippingMethods.controller');

router.get('/', controller.GetAllMethodShipping)





module.exports = router