const multer = require("multer");
const path = require("path");

// validate format file upload
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

// Multer config
const upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');


const checkContentFileUploads = (req, res, next) => {

   
    upload(req, res, (err) => {

        if (err instanceof multer.MulterError) {

            return res.status(418).send("File quá lớn");
        } else {
            if (req.file == undefined || req.file == null) {
                res.status(400).send('Lỗi : chưa có file ảnh nào được chọn!');
            } else {
                next();
            }
        }
    });
}
module.exports = {
    checkContentFileUploads
};

// const storage = multer.diskStorage({
//     destination: './_public/uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
// // Init Upload


// function checkFileType(file, cb) {
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 },
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// }).single('image');


// const path = require('path');

// const storage = multer.diskStorage({
//     destination: './_public/uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
// // Init Upload



// router.post('/:id', (req, res, next) => {

//     upload(req, res, (err) => {
//         if (err instanceof multer.MulterError) {

//             return res.status(418).send("File quá lớn");
//         } else {

//             if (req.file == undefined) {
//                 res.send("'Error: No File Selected!'");
//             } else {

//                 // const uploader = async(path) => await cloudinary.uploads(path,'products');
//                 // uploader(req.file.path);


//                 // try {
//                 //     const fileStr = req.body.data;
//                 //     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//                 //         upload_preset: 'dev_setups',
//                 //     });
//                 //     console.log(uploadResponse);
//                 //     res.json({ msg: 'yaya' });
//                 // } catch (err) {
//                 //     console.error(err);
//                 //     res.status(500).json({ err: 'Something went wrong' });
//                 // }
//                 console.log(req.file)


//                 next();
//             }
//         }
//     });
// }, controller.AddProduct);
