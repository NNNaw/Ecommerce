var express = require('express')
var router = express.Router()
var controller = require('../_controllers/seriesProduct.controller');

// router.get('/', controller.GetAllOrder)

// router.get('/:id', controller.GetAllOrderByIdCustomer)

// router.get('/GetAllOrderComfirmedByIdCustomer/:id', controller.GetAllOrderComfirmedByIdCustomer)
// router.get('/GetAllOrderUnComfirmedByIdCustomer/:id', controller.GetAllOrderUnComfirmedByIdCustomer)


router.post('/', controller.CreateSeriesProduct)



module.exports = router