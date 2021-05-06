// setup
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
// const { json } = require('body-parser');
const connectDB = require('./Connection')

const dotenv = require('dotenv')
var cors = require('cors')
const port = process.env.PORT || 9991
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PATCH', "DELETE", 'PUT']
// }))
app.use(express.static(__dirname + '/_public'));
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "false");

  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
  // res.setHeader("Content-Type", "application/json;charset=utf-8"); // Opening this comment will cause problems
  next();
});
dotenv.config();

connectDB();

//routes
const routeProduct = require('./_routes/products.route')
const routeAccount = require('./_routes/accounts.route')
const routeCategory = require('./_routes/category.route')
const routeBrand = require('./_routes/brands.route')
const routeOrder = require('./_routes/orders.route')
const routePaymentMethod = require('./_routes/paymentMethods.route')
const routeShippingMethod = require('./_routes/shippingMethods.route')
const routeBrandCategory = require('./_routes/brandCategories.route')
const routeCustomer = require('./_routes/customer.route')
const routeSeriesProduct = require('./_routes/seriesProduct.route')

const routeProductTest = require('./_routes/productTest.route');
const { required } = require('@hapi/joi');

app.use('/products', routeProduct);
app.use('/accounts', routeAccount);
app.use('/customers', routeCustomer)
app.use('/categories', routeCategory);
app.use('/brands', routeBrand);
app.use('/shippingMethod', routeShippingMethod);
app.use('/paymentMethod', routePaymentMethod);
app.use('/order', routeOrder);
app.use('/brandCategory', routeBrandCategory);
app.use('/seriesProducts', routeSeriesProduct);


app.use('/producttests/nam' , (req, res)=>{res.send('Nam')});


app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})