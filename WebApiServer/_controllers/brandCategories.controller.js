const BrandCategory = require('./../_models/brandCategories.model')
const Brand = require('./../_models/brands.model')

//
module.exports.GetByIdCategory = async function (req, res) {
    console.log(req.params.Id_Category)


    var brandCategories = await BrandCategory.find({ Id_Category: req.params.Id_Category });

    /// not good
    var listBrands = []
    let index = brandCategories.length - 1;
    while (index >= 0) {

        let brand = await Brand.findOne({ _id: brandCategories[index].Id_Brand });
        listBrands.push(brand);
        index--;
    }
    
    res.json(listBrands);



}




//
// module.exports.GetByIdBrand = async function (req, res) {
//     var brandCategories = await BrandCategory.find({Id_Brand:  req.params.Id_Brand});
//     res.json(brandCategories);
// }