const SeriesProduct = require('./../_models/seriesProduct.model')
const { generateAlias } = require('./../generateAlias');
const cloudinary = require('../cloudinary');

// module.exports.GetDetailSeriesProduct = function (req, res) {

//   Category.SeriesProduct({})
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       console.log('error: ', error);
//     });
// }

module.exports.CreateSeriesProduct = function (req, res) {

    // const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: "Products",
    //     resourse_type: "auto"
    // });

    // // create object image temp
    // const image = {
    //     url: result.secure_url,
    //     cloudinary_id: result.public_id,
    //     properties: "Default"
    // }


    const brandSave = {
        _id: req.body.Id_Brand,
        nameBrand: req.body.nameBrand
    }

    // const category = await Category.findById(req.body.Id_Category)

    const categorySave = {
        _id: req.body.Id_Category,
        nameCategory: req.body.nameCategory
    }

    const newSeriesProduct = {
        name: req.body.name,
        alias: generateAlias(req.body.category_Series.nameCategory) +
            '/' + generateAlias(req.body.brand_Series.nameBrand) + '/'
            + generateAlias(req.body.name),
        brand_Series: brandSave,
        category_Series: categorySave,
        management_Series: req.body.management_Series
    }

    try {
        SeriesProduct.findOne({ alias: newSeriesProduct.alias }).then((seriesProduct) => {
            if (seriesProduct)
                return res.status(400).send("Series này đã tồn tại...")
        })

        SeriesProduct.create(newSeriesProduct)
            .then((seriesProduct) => {
                res.json(seriesProduct);
            })
            .catch((error) => {
                console.log('error: ', error);
            });

    } catch (error) {
        res.status(500).send("Vui lòng thử lại...")
    }
}