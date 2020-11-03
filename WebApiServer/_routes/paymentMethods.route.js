var express = require('express')
var router = express.Router()
var controller = require('../_controllers/paymentMethods.controller');

router.get('/', controller.GetAllMethodPayment)



module.exports = router