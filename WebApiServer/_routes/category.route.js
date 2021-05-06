const express = require('express');
const { Roles } = require('../_common/variable.common');
const router = express.Router()

const controller = require('../_controllers/categories.controller');
const { checkContentFileUploads } = require('./../multer');
const { verifyToken } = require('./verifyToken');
// const verify = require('./verifyToken')


// route get all category
router.get('/', controller.GetAllCategory);

//get by id
// router.get('/:id', controller.byID);


router.post("/", verifyToken(Roles.Management), checkContentFileUploads, controller.createCategory);

// github
router.delete("/:id", controller.deleteCategory);


//   router.put("/:id", upload.single("image"), async (req, res) => {
//     try {
//       let user = await User.findById(req.params.id);
//       // Delete image from cloudinary
//       await cloudinary.uploader.destroy(user.cloudinary_id);
//       // Upload image to cloudinary
//       const result = await cloudinary.uploader.upload(req.file.path);
//       const data = {
//         name: req.body.name || user.name,
//         avatar: result.secure_url || user.avatar,
//         cloudinary_id: result.public_id || user.cloudinary_id,
//       };
//       user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
//       res.json(user);
//     } catch (err) {
//       console.log(err);
//     }
//   });

module.exports = router


