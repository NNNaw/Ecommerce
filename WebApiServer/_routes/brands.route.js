var express = require('express');
const { checkContentFileUploads } = require('../multer');
const { Roles } = require('../_common/variable.common');
var router = express.Router()

const controller = require('../_controllers/brands.controller');
const { verifyToken } = require('./verifyToken');
// const verify = require('./verifyToken')



// define the home page route
router.get('/', controller.GetAllBrand);

//get by id
router.get('/:id', controller.GetAllBrandByID);

router.post("/", verifyToken(Roles.Management), checkContentFileUploads, controller.createBrand);

// router.post('/',controller.addProduct);
// router.delete('/:id',controller.deleteProduct);
// router.patch('/:id',controller.updateProduct);
module.exports = router