
const Category = require('./../_models/categories.model')
const { generateAlias } = require('./../generateAlias')

const cloudinary = require('./../cloudinary');


module.exports.GetAllCategory = function (req, res) {


  Category.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}

module.exports.createCategory = async function (req, res) {

  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Categories",
      resourse_type: "auto"
    });

    //generate new Categopry
    const newCategory = new Category({
      nameCategory: req.body.nameCategory,
      aliasCategory: generateAlias(req.body.nameCategory),
      managementCreated : req.managementCreated,
      image: result.secure_url,
      cloudinary_id: result.public_id,

    });
    // add Category to Db
    Category.create(newCategory).then(function (category) {
      res.send(category);
    })

  } catch (err) {
    console.log(err);
  }
}


module.exports.deleteCategory = async function (req, res) {

  try {
    // Find user by id
    let category = await Category.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(category.cloudinary_id);
    // Delete category from db
    await category.remove();

    res.send("Xóa thành công!!");
  } catch (err) {
    console.log(err);
  }
}