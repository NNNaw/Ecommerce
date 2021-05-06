var express = require('express')
var router = express.Router()
var controller = require('../_controllers/products.controller');
const { verifyToken } = require('./verifyToken')
// const cloudinary = require('./../cloudinary');

const { checkContentFileUploads } = require('../multer');
const { Roles } = require('../_common/variable.common');



// define the home page route
router.get('/', controller.GetAllProduct);

//get by id
router.get('/:id', controller.GetById);
//get by alias
// router.get('/:aliasCategory', controller.GetSeriesProductByAlias);
// router.get('/:aliasCategory/:aliasBrand', controller.GetSeriesProductByAlias);
// router.get('/:aliasCategory/:aliasBrand/:aliasSeries', controller.GetSeriesProductByAlias);
// router.get('/:aliasCategory/:aliasBrand/:aliasSeries/:aliasProduct', controller.GetProductByAlias);
// router.get('/:aliasCategory/:aliasBrand/:aliasSeries/:aliasProduct/:keyDetailProduct', controller.GetDetailProductByAlias);



router.get('/GetByIdCategory/:id', controller.GetByIdCategory);

router.get('/SearchList/:key', controller.GetListSearch);





router.post('/', verifyToken(Roles.Employee), checkContentFileUploads, controller.createProduct)

router.delete('/:id', controller.deleteProduct);
router.patch('/:id', controller.updateProduct);


router.patch('/updateImageProduct/:id', (req, res, next) => {

    upload(req, res, (err) => {
        console.log(req.file)
        if (err instanceof multer.MulterError) {
            // res.render('index', {
            //   msg: err
            // });

            return res.status(418).send("File quá lớn");
        } else {
            if (req.file == undefined) {
                res.send("'Error: No File Selected!'");
            } else {
                next();
            }
        }
    });
}, controller.updateImageProduct);



module.exports = router



// router.post('/:id', async (req, res, next) => {
//     try {
//         console.log(req.body)
//         // const fileStr = req.body.image;
//         // const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//         //     upload_preset: 'products',
//         // });
//         // console.log(uploadResponse);
//         // res.json({ msg: 'yaya' });
//         next();
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ err: 'Something went wrong' });
//     }
// }, controller.AddProduct);