var express = require('express')
var router = express.Router()
var multer  = require('multer')
const path = require('path');
var controller = require('../_controllers/productTest.controller');

const storage = multer.diskStorage({
    destination: './_public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  // Init Upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('imageProduct');


function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
}
    
router.get('/', controller.GetAll)
router.get('/:id', controller.GetDetail)
router.get('/DanhSachSanPhamTimKiem/:key', controller.GetListSearch)
// router.post('/', upload.single('imageProduct'),controller.addProduct)
 router.post('/', upload ,controller.addProduct)


module.exports = router