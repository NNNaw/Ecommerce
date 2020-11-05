var express = require('express')
var router = express.Router()
var controller = require('../_controllers/accounts.controller');



// const { route } = require('./products.route');

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



router.get('/customer/:id', controller.GetCustomer)


router.post('/register', controller.Register);
router.post('/login', controller.Login);




router.patch('/ChangePassword/:id', controller.ChangePassword);
router.patch('/UpdateCustomer/:id', controller.UpdateCustomer);
//  router.patch('/uploadimage/:id',upload, controller.updateImage);


router.patch('/uploadimage/:id', (req, res, next) => {

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
}, controller.updateImage);



module.exports = router