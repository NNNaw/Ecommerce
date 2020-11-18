var express = require('express')
var router = express.Router()

var controller = require('../_controllers/products.controller');
const verify = require('./verifyToken')

var multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: './_public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
// Init Upload



function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');




// define the home page route
router.get('/', controller.GetAllProduct);

// router.get('/',verify, controller.index);


//get by id
router.get('/:id', controller.GetById);
router.get('/GetByIdCategory/:id', controller.GetByIdCategory);
router.get('/SearchList/:key', controller.GetListSearch);

router.post('/:id', (req, res, next) => {

    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          
            return res.status(418).send("File quá lớn");
        } else {
           
            if (req.file == undefined) {
                res.json().statusMessage("'Error: No File Selected!'");
            } else {
                next();
            }
        }
    });
}, controller.AddProduct);

router.delete('/:id', controller.deleteProduct);
router.patch('/:id', controller.updateProduct);


router.patch('/updateImageProduct/:id', (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // res.render('index', {
            //   msg: err
            // });

            return res.status(418).send("File quá lớn");
        } else {
            if (req.file == undefined) {
                res.json().statusMessage("'Error: No File Selected!'");
            } else {
                next();
            }
        }
    });
}, controller.updateImageProduct);



module.exports = router