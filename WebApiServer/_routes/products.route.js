var express = require('express')
var router = express.Router()

var controller = require('../_controllers/products.controller');
const verify = require('./verifyToken')



// define the home page route
router.get('/', controller.GetAllProduct);

// router.get('/',verify, controller.index);


//get by id
router.get('/:id', controller.GetById);
router.get('/GetByIdCategory/:id', controller.GetByIdCategory);
router.get('/SearchList/:key', controller.GetListSearch);

router.post('/',controller.addProduct);
router.delete('/:id',controller.deleteProduct);
router.patch('/:id',controller.updateProduct);
module.exports = router