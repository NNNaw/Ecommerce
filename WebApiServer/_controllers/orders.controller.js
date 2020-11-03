const Order = require('../_models/orders.model')
const Product = require('../_models/products.model')
const ShippingMethod = require('../_models/shippingMethods.model')
const PaymentMethod = require('../_models/paymentMethods.model');
const Customer = require('../_models/customer.model');
const ObjectID = require('mongodb').ObjectID;

// const Order = require('../_models/employee.model')
// get all
module.exports.GetAllOrder = async function (req, res) {

    var order = await Order.find();
    res.json(order);
};



module.exports.GetAllOrderByIdCustomer = async function (req, res) {


    let accountCustomer = req.params.id;

    var listOrders = await Order.find({ account: accountCustomer }); // list all order

    var detailOrders = [];

    let index = listOrders.length - 1;
    while (index >= 0) {
        let { _id, dateCheckout, dateCheckin, status, address, note } = listOrders[index]

        var detailOrder = []; // list of product in each order
        //find info shipping
        let shipping = await ShippingMethod.findOne({ _id: listOrders[index].Id_ShippingMethod });
        let { nameShippingMethod, FeeShipping } = shipping;

        //find info payment
        let payment = await PaymentMethod.findOne({ _id: listOrders[index].Id_PaymentMethod });
        let { Id_PaymentMethod, namePaymentMethod, TexMethod } = payment;

        // find info product

        var listProduct = listOrders[index].OrderDetail;

        let indexProduct = listProduct.length - 1;
        while (indexProduct >= 0) {

            let product = await Product.findOne({ _id: listProduct[indexProduct].Id_Product });

            let { _id, name, image, price } = product;
            let infoProduct = {
                _id: _id,
                name: name,
                image: image,
                price: price,
                quantity: listProduct[indexProduct].quantity
            }

            detailOrder.push(infoProduct);

            indexProduct--;
        }

        let itemOrder = {
            _id: _id,
            dateCheckout: dateCheckout,
            dateCheckin: dateCheckin,
            status: status,
            address: address,
            note: note,

            Id_PaymentMethod: payment._id,
            namePaymentMethod: namePaymentMethod,
            TexMethod: TexMethod,

            Id_ShippingMethod: shipping._id,
            nameShippingMethod: nameShippingMethod,
            FeeShipping: FeeShipping,
            OrderDetail: detailOrder
        }

        detailOrders.push(itemOrder);

        index--;




    }

    res.json(detailOrders);
};

module.exports.GetAllOrderComfirmedByIdCustomer = async function (req, res) {


    let accountCustomer = req.params.id

    var listOrders = await Order.find({ account: accountCustomer, OrderDetail: { status: true } }); // list all order comfirmed

    var detailOrders = [];

    let index = listOrders.length - 1;
    while (index >= 0) {
        let { _id, dateCheckout, dateCheckin, status, address, note } = listOrders[index]

        var detailOrder = []; // list of product in each order
        //find info shipping
        let shipping = await ShippingMethod.findOne({ _id: listOrders[index].Id_ShippingMethod });
        let { nameShippingMethod, FeeShipping } = shipping;

        //find info payment
        let payment = await PaymentMethod.findOne({ _id: listOrders[index].Id_PaymentMethod });
        let { namePaymentMethod, TexMethod } = payment;

        // find info product

        var listProduct = listOrders[index].OrderDetail;

        let indexProduct = listProduct.length - 1;
        while (indexProduct >= 0) {

            let product = await Product.findOne({ _id: listProduct[indexProduct].Id_Product });

            let { _id, name, image, price } = product;
            let infoProduct = {
                _id: _id,
                name: name,
                image: image,
                price: price,
                quantity: listProduct[indexProduct].quantity
            }

            detailOrder.push(infoProduct);

            indexProduct--;
        }

        let itemOrder = {
            _id: _id,
            dateCheckout: dateCheckout,
            dateCheckin: dateCheckin,
            status: status,
            address: address,
            note: note,

            namePaymentMethod: namePaymentMethod,
            TexMethod: TexMethod,

            nameShippingMethod: nameShippingMethod,
            FeeShipping: FeeShipping,

            OrderDetail: detailOrder
        }


        detailOrders.push(itemOrder);

        index--;




    }

    res.json(detailOrders);
};
module.exports.GetAllOrderUnComfirmedByIdCustomer = async function (req, res) {
    let accountCustomer = req.params.id

    var listOrders = await Order.find({ account: accountCustomer, OrderDetail: { status: false } }); // list all order comfirmed

    var detailOrders = [];

    let index = listOrders.length - 1;
    while (index >= 0) {
        let { _id, dateCheckout, dateCheckin, status, address, note } = listOrders[index]

        var detailOrder = []; // list of product in each order
        //find info shipping
        let shipping = await ShippingMethod.findOne({ _id: listOrders[index].Id_ShippingMethod });
        let { nameShippingMethod, FeeShipping } = shipping;

        //find info payment
        let payment = await PaymentMethod.findOne({ _id: listOrders[index].Id_PaymentMethod });
        let { namePaymentMethod, TexMethod } = payment;

        // find info product

        var listProduct = listOrders[index].OrderDetail;

        let indexProduct = listProduct.length - 1;
        while (indexProduct >= 0) {

            let product = await Product.findOne({ _id: listProduct[indexProduct].Id_Product });

            let { _id, name, image, price } = product;
            let infoProduct = {
                _id: _id,
                name: name,
                image: image,
                price: price,
                quantity: listProduct[indexProduct].quantity
            }

            detailOrder.push(infoProduct);

            indexProduct--;
        }

        let itemOrder = {
            _id: _id,
            dateCheckout: dateCheckout,
            dateCheckin: dateCheckin,
            status: status,
            address: address,
            note: note,

            namePaymentMethod: namePaymentMethod,
            TexMethod: TexMethod,

            nameShippingMethod: nameShippingMethod,
            FeeShipping: FeeShipping,

            OrderDetail: detailOrder
        }


        detailOrders.push(itemOrder);

        index--;




    }

    res.json(detailOrders);
}


module.exports.CreateOrder = async function (req, res) {

    const order = new Order({
        address: req.body.nameProduct,
        note: req.body.note,

        Id_PaymentMethod: req.body.Id_PaymentMethod,
        Id_ShippingMethod: req.body.Id_ShippingMethod,
        Id_Employee: "",

        dateCheckin: Date.now(),
        dateCheckout: "2020-12-12",
        status: req.body.status,
        account: req.params.id,
        OrderDetail: JSON.parse(req.body.OrderDetail)
    });

    try {
        const saveOrder = await order.save();
        res.json(saveOrder);





    } catch (err) {
        res.json({ message: err })
    }


}


module.exports.CancelOrder = async function (req, res) {

    try {
        const deleteOrder = await Order.remove({ _id: req.params.id });
        res.json(deleteOrder);
    } catch (error) {
        res.json({ message: error })

    }

}