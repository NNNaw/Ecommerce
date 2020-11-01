const Brand = require('./../_models/brands.model')



module.exports.GetAllBrand = async function (req, res) {
    
    var brand = await Brand.find();
    res.json(brand);
}