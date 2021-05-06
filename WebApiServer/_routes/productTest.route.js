var express = require('express')
var router = express.Router()
// const { Roles } = require('../_common/variable.common');
// const { verifyToken, checkAccessCustomer } = require('./verifyToken');
const { checkContentFileUploads } = require('../multer');

var controller = require('../_controllers/productTest.controller');


// router.get('/', controller.GetAll)


router.post('/', checkContentFileUploads, controller.CreateProductTest)


module.exports = router