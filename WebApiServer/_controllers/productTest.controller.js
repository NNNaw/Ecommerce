const ProductTest = require('../_models/producttest.model')


module.exports.GetAll = async function(req,res){
    var products = await ProductTest.find();
    res.json(products);
};

module.exports.GetDetail = async function(req, res) {
    var id = req.params.id;
    console.log(id);
    var product = await ProductTest.findOne({ _id: id } );
    res.json(product);
 };

 module.exports.GetListSearch = async function(req, res) {
  

    var string = req.params.key;
    var regex = new RegExp([string]);
    console.log(regex);
    // Creates a regex of: /^SomeStringToFind$/i
    var products = await ProductTest.find({ nameProduct: regex });
    res.json(products);
 };


 module.exports.addProduct = async function(req,res){
    //   console.log(req.file)
    const product = new ProductTest({
     nameProduct : req.body.nameProduct,
   
     priceProduct : req.body.priceProduct,
     imageProduct : `uploads/${req.file.filename}`
 });


 try {
     const saveProduct = await product.save();
     res.json(saveProduct);
 } catch (err) {
     res.json({message : err})
 }
}