const { model } = require('./../_models/categories.model')
const Category = require('./../_models/categories.model')



module.exports.GetAllCategory = async function (req, res) {
    
    var category = await Category.find();
    res.json(category);

}