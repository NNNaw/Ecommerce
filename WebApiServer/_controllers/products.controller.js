const Brand = require('../_models/brands.model');
const Category = require('../_models/categories.model');
const Employee = require('../_models/employee.model');
const Product = require('../_models/products.model')

// get all
module.exports.GetAllProduct = async function (req, res) {

    let products = await Product.find();


    let index = products.length - 1;
    let arrayProduct = []
    while (index >= 0) {
        let product = products[index];
        let productSent = {}
        let employee = await Employee.findOne({ _id: product.Id_Employee });
        let { account } = employee
        let brand = await Brand.findOne({ _id: product.Id_Brand });
        let { nameBrand } = brand

        let category = await Category.findOne({ _id: product.Id_Category });
        let { nameCategory } = category



        let { _id, alias, name, price, image, descripts, material, origin, quantity,
            ram, rom, operator, Id_Brand, Id_Category, Id_Employee } = products[index]

        productSent = {

            _id: _id,
            alias: alias,
            name: name,
            price: price,
            descripts: descripts,
            image: image,
            material: material,
            origin: origin,
            quantity: quantity,
            ram: ram,
            rom: rom,
            operator: operator,
            nameCategory: nameCategory,
            nameBrand: nameBrand,

            accountCreatedProduct: account,
            Id_Category: Id_Category,
            Id_Brand: Id_Brand,

            Id_Employee: Id_Employee,

        }

        arrayProduct.push(productSent);
        index--;
    }

    res.json(arrayProduct);
};

// get detail product
module.exports.GetById = async function (req, res) {
    var id = req.params.id;
    console.log(id);
    var products = await Product.findOne({ _id: id });
    res.json(products);
};


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



module.exports.GetListSearch = async function (req, res) {

    //github
    // var string = "SomeStringToFind";
    // var regex = new RegExp(["^", string, "$"].join(""), "i");
    // // Creates a regex of: /^SomeStringToFind$/i
    // db.stuff.find({ foo: regex });


    var string = req.params.key;
    if (string === "getAll") {
        // get all products
        var products = await Product.find();
    }
    else {
        var regex = new RegExp([string].join(""), "i");
        console.log(regex);

        var products = await Product.find({
            name: {
                $in: [regex]
            }
        });
    }
    // console.log(string)
    // var regex = new RegExp([string].join(""), "i");

    // var products = await Product.find({
    //     name: {
    //         $in: [regex]
    //     }
    // });

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

module.exports.AddProduct = async function (req, res) {

    // check alias product is exist
    // const aliasProductExist = await Product.findOne({ alias: req.body.alias });

    // if (aliasProductExist) return res.status(400).send("alias already exists.");




    try {


        const aliasProduct = replace_character(req.body.name).toLowerCase().split(' ').join('-');

        let employee = await Employee.findOne({ account: req.params.id });

        const product = new Product({
            name: req.body.name,
            alias: aliasProduct,
            price: req.body.price,
            quantity: req.body.quantity,
            ram: req.body.ram,
            rom: req.body.rom,
            Id_Brand: req.body.Id_Brand,
            Id_Category: req.body.Id_Category,
            image: `uploads/${req.file.filename}`,
            descripts: "mlemmlem",
            operator: "IOS",
            origin: "USA",
            material: "Vàng nguyên khối",
            Id_Employee: employee._id,
        });

        const saveProduct = await product.save();
        res.json(saveProduct);
    } catch (err) {
        res.json({ message: "Lỗi cc" })
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

