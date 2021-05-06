var express = require('express')
var router = express.Router()
var controller = require('../_controllers/accounts.controller');

const { verifyToken, checkAccessCustomer } = require('./verifyToken')

const { checkContentFileUploads } = require('../multer');
const { validateDataRegister } = require('../_common/middleware'); // validate data and check role user
const { Roles } = require('../_common/variable.common');



router.post('/registerCustomer', validateDataRegister(), controller.RegisterCustomer);
router.post('/registerEmployee', verifyToken(Roles.Management), validateDataRegister(), controller.RegisterEmployee);

router.post('/login', controller.Login);


router.patch('/ChangePassword/:id', controller.ChangePassword);
router.patch('/UpdateCustomer/:id', controller.UpdateCustomer);
//  router.patch('/uploadimage/:id',upload, controller.updateImage);


router.patch('/uploadimage/:id', checkContentFileUploads, controller.updateImage);



module.exports = router