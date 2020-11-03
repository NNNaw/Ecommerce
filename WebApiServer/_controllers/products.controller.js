const Product = require('../_models/products.model')

// get all
module.exports.GetAllProduct = async function (req, res) {

    var products = await Product.find();
    res.json(products);
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

module.exports.addProduct = async function (req, res) {

    // check alias product is exist
    const aliasProductExist = await Product.findOne({ alias: req.body.alias });
    if (aliasProductExist) return res.status(400).send("alias already exists.");


    const product = new Product({
        nameProduct: req.body.nameProduct,
        alias: req.body.alias,
        priceProduct: req.body.priceProduct,
        ratingProduct: req.body.ratingProduct,
        descriptProduct: req.body.descriptProduct
    });
    try {
        const saveProduct = await product.save();
        res.json(saveProduct);
    } catch (err) {
        res.json({ message: err })
    }
}

module.exports.updateProduct = async (req, res) => {

    try {
        const updateProduct = await Product.updateOne(
            { _id: req.params.id },
            {
                $set:
                {
                    nameProduct: req.body.nameProduct,
                    alias: req.body.alias,
                    priceProduct: req.body.priceProduct,
                    ratingProduct: req.body.ratingProduct,
                    descriptProduct: req.body.descriptProduct
                }
            });
        res.json(updateProduct);
    } catch (error) {
        res.json({ message: err })
    }

}



