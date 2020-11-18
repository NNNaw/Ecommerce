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