const cloudinary = require('../cloudinary');
const { generateAlias } = require('../generateAlias');
const Product = require('../_models/products.model');
const Brand = require('./../_models/brands.model')



module.exports.GetAllBrand = async function (req, res) {

    var brand = await Brand.find();
    res.json(brand);
}
module.exports.GetAllBrandByID = async function (req, res) {
    var listProduct = await Product.find({ Id_Brand: req.params.id })
    res.json(listProduct);
}
module.exports.createBrand = async function (req, res) {

    console.log("createBrand")
    try {

        Brand.findOne({ nameBrand: req.body.nameBrand }).then(function (brand) {
            if (brand) {
                res.status(401).json("Tên hãng đã tồn tại ... vui lòng nhập tên khác!!")
            }
        })

        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "Brands",
            resourse_type: "auto"
        });

        //generate new Categopry
        const newBrand = new Brand({
            nameBrand: req.body.nameBrand,
            aliasBrand: generateAlias(req.body.nameBrand),
            managementCreated: req.managementCreated,
            image: result.secure_url,
            cloudinary_id: result.public_id,

        });
        // add Category to Db
        Brand.create(newBrand).then(function (brand) {
            res.send(brand);
        })

    } catch (err) {
        console.log(err);
    }

}