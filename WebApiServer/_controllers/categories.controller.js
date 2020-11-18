
const Category = require('./../_models/categories.model')



module.exports.GetAllCategory = async function (req, res) {
    
    var category = await Category.find();
    res.json(category);

}

module.exports.addCategory = async function (req, res) {
    
  Category.create(req.body).then(function(category) {
      res.send(category);
  })

}