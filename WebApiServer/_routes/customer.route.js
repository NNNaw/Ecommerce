var express = require('express');
var router = express.Router()

const { Roles } = require('../_common/variable.common');
const { verifyToken, checkAccessCustomer } = require('./verifyToken');
const controller = require('./../_controllers/customer.controller')



router.get('/onload', verifyToken(Roles.Customer), controller.GetCustomer);

router.get('/:id', verifyToken(Roles.Customer), checkAccessCustomer(), controller.GetCustomer);
module.exports = router