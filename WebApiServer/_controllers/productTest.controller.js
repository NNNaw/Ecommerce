// const ProductTest = require('../_models/producttest.model')


// module.exports.GetAll = async function (req, res) {
//     var products = await ProductTest.find();
//     res.json(products);
// };

// module.exports.GetDetail = async function (req, res) {
//     var id = req.params.id;
//     console.log(id);
//     var product = await ProductTest.findOne({ _id: id });
//     res.json(product);
// };

// module.exports.GetListSearch = async function (req, res) {


//     var string = req.params.key;
//     var regex = new RegExp([string]);
//     console.log(regex);
//     // Creates a regex of: /^SomeStringToFind$/i
//     var products = await ProductTest.find({ nameProduct: regex });
//     res.json(products);
// };


// module.exports.addProduct = async function (req, res) {
//       console.log(req.file)
//         const product = new ProductTest({
//          nameProduct : req.body.nameProduct,

//          priceProduct : req.body.priceProduct,
//          imageProduct : `uploads/${req.file.filename}`
//      });


//      try {
//          const saveProduct = await product.save();
//          res.json(saveProduct);
//      } catch (err) {
//          res.json({message : err})
//      }
//     res.json(req.body);
// }



const ProductTest = require('./../_models/producttest.model')
const { generateAlias } = require('./../generateAlias')
const cloudinary = require('../cloudinary');


module.exports.CreateProductTest = async function (req, res) {

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Products",
        resourse_type: "auto"
    });

    const image = {
        url: result.secure_url,
        cloudinary_id: result.public_id,
        properties: "Default"
    }


    const newImage = {
        url: "",
        Id_cloud: "",
        quantity: req.body.quantity,
        price: req.body.price,
        color: req.body.color,
        employee_Product: {
            _id: req.body.id_Employee_Product,
            account: req.body.account_Employee_Product,

        },
        // sale_off: req.body.sale_off,
    }


    const newOption = {
        rom: req.body.rom,
        images: [newImage],
        nameOption: req.body.name + " " + req.body.rom + "GB",
        aliasOption: req.body.alias_Series_Product + '/' +
            generateAlias(req.body.name + " " + req.body.rom + "GB")
    }


    const newSeriesItem = {
        name: req.body.name, // iphone 12 Mini, iphone 12 Pro , iphone 12 Pro max
        alias: generateAlias(req.body.name),
        options: [newOption],
        ram: req.body.ram,
    }

    const newProductTest = {
        series_product: {
            _id: req.body.id_Series_Product,
            alias: req.body.alias_Series_Product
        },
        seriesItems: [newSeriesItem

            // contentDiscount: req.body.contentDiscount,
            // screen: req.body.screen,
            // camera: req.body.camera,
            // boxItems: req.body.boxItems,
            // cpu: req.body.cpu,
            // gpu: req.body.gpu,
            // battery: req.body.battery,
            // Specialfeatures: req.body.Specialfeatures,
            // origin: req.body.origin,
            // material : req.body.material,
            // OS : req.body.OS,
            // warranty_period : req.body.warranty_period,
            // descript : req.body.descript
            // }
        ]
    }

    try {

        ProductTest.findOne({ series_product: newProductTest.series_product }) // tìm kím series đã có ở db chưa
            .then((productTest) => {
                if (productTest) {//series đã tồn tại 
                    const indexSeries = productTest.seriesItems // iphone 12 || iphone 12 pro || iphone 12 pro max 
                        .findIndex(ele => ele.name === req.body.name) //tìm kím tên product đã có ở db chưa

                    if (indexSeries >= 0) { // tên product đã tồn tại

                        //exp : iphone 12 đã tồn tại => push iphone 12 128Gb 

                        // if (productTest.seriesItems.options.aliasOption === newOption.aliasOption) {
                        //     return res.status(400).json("Sản phẩm đã tồn tại, vui lòng kiểm tra lại ...")
                        // }



                        productTest.seriesItems[0].options.push(newOption)
                        //  = tempSeries.options.push(newOption)
                        productTest.save();
                        res.json(productTest);
                    } else {//tên product chưa đã tồn tại 
                        //exp : push iphone 12 pro 
                        productTest.seriesItems.push(newSeriesItem)
                        productTest.save();
                        res.json(productTest);
                    }

                } else {//series chưa tồn tại 
                    ProductTest.create(newProductTest)
                        .then((productTest) => {
                            res.json(productTest);
                        })
                        .catch((error) => {
                            console.log('error: ', error);
                        });
                }
            })
    } catch (error) {
        res.status(500).send("Vui lòng thử lại...")
    }
}