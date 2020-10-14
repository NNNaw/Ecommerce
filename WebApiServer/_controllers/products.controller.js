const Product = require('../_models/products.model')

// get all
module.exports.index = async function(req, res) {
  
   var products = await Product.find();
   res.json(products);
};


// get detail product
module.exports.byID = async function(req, res) {
    var id = req.params.id;
    console.log(id);
    var products = await Product.find({ nameProduct: id } );
    res.json(products);
 };

 //post

 module.exports.addProduct = async function(req,res){
        const product = new Product({
        nameProduct : req.body.nameProduct,
        alias : req.body.alias,
        priceProduct : req.body.priceProduct,
        ratingProduct: req.body.ratingProduct,
        descriptProduct: req.body.descriptProduct
     });
     try {
         const saveProduct = await product.save();
         res.json(saveProduct);
     } catch (err) {
         res.json({message : err})
     }
 }

 module.exports.updateProduct = async  (req,res)=> {

    try {
        const updateProduct = await Product.updateOne(
            {_id:req.params.id},
           { $set :
             {
                nameProduct : req.body.nameProduct,
                alias : req.body.alias,
                priceProduct : req.body.priceProduct,
                ratingProduct: req.body.ratingProduct,
                descriptProduct: req.body.descriptProduct
            }
           });
        res.json(updateProduct);
    } catch (error) {
        res.json({message : err})
    }

 }


 
 module.exports.deleteProduct = async function (req,res) {

    try {
        const deleteProduct = await Product.remove({_id:req.params.id});
        res.json(deleteProduct);
    } catch (error) {
        res.json({message : err})
    }
}