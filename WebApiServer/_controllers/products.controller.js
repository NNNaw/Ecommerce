const cloudinary = require('../cloudinary');
const { generateAlias } = require('../generateAlias');
const Brand = require('../_models/brands.model');
const Category = require('../_models/categories.model');
const Employee = require('../_models/employee.model');
const Product = require('../_models/products.model');
const SeriesProduct = require('../_models/seriesProduct.model');

// get all
module.exports.GetAllProduct = async function (req, res) {


    Product.find({})
        .then((data) => {

            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });

    // let products = await Product.find();
    // let index = products.length - 1;
    // let arrayProduct = []
    // while (index >= 0) {
    //     let product = products[index];
    //     let productSent = {}
    //     let employee = await Employee.findOne({ _id: product.Id_Employee });
    //     let { account } = employee
    //     let brand = await Brand.findOne({ _id: product.Id_Brand });
    //     let { nameBrand } = brand

    //     let category = await Category.findOne({ _id: product.Id_Category });
    //     let { nameCategory } = category



    //     let { _id, alias, name, price, image, descripts, material, origin, quantity,
    //         ram, rom, operator, Id_Brand, Id_Category, Id_Employee } = products[index]

    //     productSent = {

    //         _id: _id,
    //         alias: alias,
    //         name: name,
    //         price: price,
    //         descripts: descripts,
    //         image: image,
    //         material: material,
    //         origin: origin,
    //         quantity: quantity,
    //         ram: ram,
    //         rom: rom,
    //         operator: operator,
    //         nameCategory: nameCategory,
    //         nameBrand: nameBrand,

    //         accountCreatedProduct: account,
    //         Id_Category: Id_Category,
    //         Id_Brand: Id_Brand,

    //         Id_Employee: Id_Employee,

    //     }

    //     arrayProduct.push(productSent);
    //     index--;
    // }

    // res.json(arrayProduct);
};

// get detail product
module.exports.GetById = async function (req, res) {
    var id = req.params.id;
    console.log(id);
    var products = await Product.findOne({ _id: id });
    res.json(products);
};

module.exports.GetProductByAlias = async function (req, res) {



    let { aliasBrand, aliasCategory, aliasSeries, aliasProduct } = req.params;
    var alias_product = aliasCategory + '/' + aliasBrand + '/' + aliasSeries + '/' + aliasProduct

    console.log(alias_product)
    //dien-thoai/apple/iphone-12-series/iphone-12-pro-528gb

    Product.findOne({ alias_Product: alias_product }).then((products) => {
        if (products) {
            console.log(products)
            res.json(products);
        } else {
            return res.status(404).json("Không tìm thấy sản phẩm ...")
        }
    });
    // console.log(product)
};
module.exports.GetDetailProductByAlias = async function (req, res) {

    let { aliasBrand, aliasCategory, aliasSeries, aliasProduct, keyDetailProduct } = req.params;
    var alias_product = aliasCategory + '/' + aliasBrand + '/' + aliasSeries + '/' + aliasProduct


    //dien-thoai/apple/iphone-12-series/iphone-12-pro-528gb

    Product.findOne({ alias_Product: alias_product }).then((product) => {
        if (product) {
            if (keyDetailProduct != undefined) {


                let option = product.options.find(element => element.rom == keyDetailProduct);
                product.options = option;

                res.json(product)
            }

            else {
                res.json(product);
            }

        } else {
            return res.status(404).json("Không tìm thấy sản phẩm ...")
        }
    });
    // console.log(product)
};

module.exports.GetSeriesProductByAlias = async function (req, res) {

    let { aliasBrand, aliasCategory, aliasSeries } = req.params;
    let alias_series = aliasCategory

    if (aliasBrand != undefined) {
        alias_series += '/' + aliasBrand
    }
    if (aliasSeries != undefined) {
        alias_series += '/' + aliasSeries
    }

    console.log(alias_series)
    //dien-thoai/apple/iphone-12-series/iphone-12-pro-528gb


    const regex = new RegExp(alias_series, 'i');

    console.log("regex")
    Product.find({ alias_Series: { $regex: regex } }).then((products) => {
        if (products) {
            res.json(products);
        } else {
            return res.status(404).json("Không tìm thấy sản phẩm ...")
        }
    });
    // console.log(product)
};

// module.exports.GetSeriesProductByAlias = async function (req, res) {

//     let { aliasBrand, aliasCategory, aliasSeries } = req.params;
//     const alias_series = aliasCategory + '/' + aliasBrand + '/' + aliasSeries

//     console.log(alias_series)
//     Product.find({ alias_Series: 'dien-thoai/apple/iphone-12-series' }).then((products) => {
//         if (products) {
//             res.json(products);
//         } else {
//             return res.status(404).json("Không tìm thấy sản phẩm ...")
//         }
//     });
//     // console.log(product)
// };


module.exports.createProduct = async function (req, res) {

    // const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: "Products",
    //     resourse_type: "auto"
    // });

    const newImage = {
        url: "result.secure_url",
        Id_cloud: "result.public_id",

        quantity: req.body.quantity,

        color: req.body.color,
        employee_Product: req.employee_product

    }


    const newOption = {
        rom: req.body.rom,
        price: req.body.price,
        // sale_off: req.body.sale_off,
        images: [newImage],
        nameOption: req.body.name + " " + req.body.rom + "GB",
        alias_Option: req.body.alias_Series_Product + '/' +
            generateAlias(req.body.name + " " + req.body.rom + "GB")
    }


    const newProduct = {
        alias_Series: req.body.alias_Series_Product,
        name: req.body.name, // iphone 12 Mini, iphone 12 Pro , iphone 12 Pro max
        alias_Product: req.body.alias_Series_Product + '/' + generateAlias(req.body.name),
        options: [newOption],
        ram: req.body.ram,
    }

    // const newProduct = {

    //     newSeriesItem,
    //     // contentDiscount: req.body.contentDiscount,
    //     // screen: req.body.screen,
    //     // camera: req.body.camera,
    //     // boxItems: req.body.boxItems,
    //     // cpu: req.body.cpu
    //     // gpu: req.body.gpu,
    //     // battery: req.body.battery,
    //     // Specialfeatures: req.body.Specialfeatures,
    //     // origin: req.body.origin,
    //     // material : req.body.material,
    //     // OS : req.body.OS,
    //     // warranty_period : req.body.warranty_period,
    //     // descript : req.body.descript
    //     // }
    // }

    try {

        Product.findOne({ alias_Product: newProduct.alias_Product }) // tìm kím series đã có ở db chưa
            .then((product) => {
                if (product) {//name đã tồn tại 
                    // const indexSeries = product.seriesItems // iphone 12 || iphone 12 pro || iphone 12 pro max 
                    //  .findIndex(ele => ele.name === req.body.name) //tìm kím tên product đã có ở db chưa

                    product.options.push(newOption)
                    product.save();
                    res.json(product);

                    // if (indexSeries >= 0) { // tên product đã tồn tại

                    //     //exp : iphone 12 đã tồn tại => push iphone 12 128Gb 

                    //     // if (productTest.seriesItems.options.aliasOption === newOption.aliasOption) {
                    //     //     return res.status(400).json("Sản phẩm đã tồn tại, vui lòng kiểm tra lại ...")
                    //     // }
                    // } else {//tên product chưa đã tồn tại 
                    //     //exp : push iphone 12 pro 
                    //     product.seriesItems.push(newSeriesItem)
                    //     product.save();
                    //     res.json(product);
                    // }

                } else {//series chưa tồn tại 
                    Product.create(newProduct)
                        .then((product) => {
                            res.json(product);
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



module.exports.deleteProduct = async function (req, res) {

    console.log(req.params.id)

    try {
        const deleteProduct = await Product.remove({ _id: req.params.id });
        res.json(deleteProduct);
    } catch (error) {
        res.json({ message: error })
    }
}
module.exports.GetByIdCategory = async function (req, res) {
    var id = req.params.id;

    var products = await Product.find({ Id_Category: id });
    res.json(products);
};


module.exports.GetListSearchKey = async (req, res) => {

    try {
        console.log("req.params.key")
    } catch (error) {
        
    }
}


module.exports.GetListSearch = async function (req, res) {

    //github
    // var string = "SomeStringToFind";
    // var regex = new RegExp(["^", string, "$"].join(""), "i");
    // // Creates a regex of: /^SomeStringToFind$/i
    // db.stuff.find({ foo: regex });


    var string = req.params.key;

    console.log(string)

    let products = [];

    if (string === "getAll") {
        // get all products
        products = await Product.find();
    }
    else {
         const regex = new RegExp([string].join(""), "i");


        products = await Product.find({
            name: {
                $in: [regex]
            }
        });
    }

   

    res.json(products);
};

//post


function replace_character(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}


function createAliasProduct(nameBrand, nameCategory, nameProduct) {
    const aliasBrand = replace_character(nameBrand).toLowerCase().split(' ').join('-');
    const aliasCategory = replace_character(nameCategory).toLowerCase().split(' ').join('-');
    const aliasName = replace_character(nameProduct).toLowerCase().split(' ').join('-');
    const alias = `${aliasBrand}/${aliasCategory}/${aliasName}`
    return alias;
}

module.exports.AddProduct = async function (req, res) {
    console.log(req.body)
    // check alias product is exist
    // const aliasProductExist = await Product.findOne({ alias: req.body.alias });

    // if (aliasProductExist) return res.status(400).send("alias already exists.");


    let brand = await Brand.findOne({ _id: req.body.Id_Brand });
    let category = await Category.findOne({ _id: req.body.Id_Category });

    const alias = createAliasProduct(brand.nameBrand, category.nameCategory, req.body.name)

    let checkalias = await Product.findOne({ name: req.body.name });
    if (checkalias !== null) {

        return res.status(400).send("Tên  sản phẩm đã tồn tại, vui lòng thay tên mới....");
    }

    try {



        let employee = await Employee.findOne({ account: req.params.id });
        const product = new Product({
            name: req.body.name,
            alias: alias,
            price: req.body.price,
            quantity: req.body.quantity,
            ram: req.body.ram,
            rom: req.body.rom,
            Id_Brand: req.body.Id_Brand,
            Id_Category: req.body.Id_Category,
            image: `uploads/`,
            descripts: "mlemmlem",
            operator: "IOS",
            origin: "USA",
            material: "Vàng nguyên khối",
            Id_Employee: employee._id,
        });

        const saveProduct = await product.save();
        res.json(saveProduct);
    } catch (err) {
        res.json({ message: "Lỗi!!" })
    }
}

module.exports.updateProduct = async (req, res) => {

    try {

        let employee = await Employee.findOne({ account: req.params.id });

        const updateProduct = await Product.updateOne(
            { _id: req.body._id },
            {
                $set:
                {
                    name: req.body.name,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    ram: req.body.ram,
                    rom: req.body.rom,
                    Id_Category: req.body.Id_Category,
                    Id_Brand: req.body.Id_Brand,
                    Id_Employee: employee._id,
                }
            });
        res.json(updateProduct);
        console.log(req.body)
    } catch (error) {
        res.json({ message: err })
    }

}

module.exports.updateImageProduct = async (req, res) => {

    try {

        const updateProduct = await Product.updateOne(
            { _id: req.params.id },
            {
                $set:
                {
                    image: `uploads/${req.file.filename}`
                }
            });

        res.json(`uploads/${req.file.filename}`);
    } catch (error) {
        res.json({ message: err })
    }

}

