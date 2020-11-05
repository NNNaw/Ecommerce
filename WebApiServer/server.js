// setup
const express = require('express')
const app = express()

const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
var cors = require('cors')

const port = process.env.PORT || 9999

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', "DELETE", 'PUT']
}))
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true

  }).then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(err.message);
  });
 
app.use(cors())
app.use(bodyparser.json());
//routes
var routeProduct = require('./_routes/products.route')
var routeAccount = require('./_routes/accounts.route')
var routeCategory = require('./_routes/category.route')
var routeBrand = require('./_routes/brands.route')
var routeOrder = require('./_routes/orders.route')
var routePaymentMethod = require('./_routes/paymentMethods.route')
var routeShippingMethod = require('./_routes/shippingMethods.route')
var routeBrandCategory = require('./_routes/brandCategories.route')


var routeProductTest = require('./_routes/productTest.route');
const { json } = require('body-parser');

app.use(express.static(__dirname + '/_public'));

app.use('/products', routeProduct);
app.use('/accounts', routeAccount);
app.use('/category', routeCategory);
app.use('/brand', routeBrand);
app.use('/shippingMethod', routeShippingMethod);
app.use('/paymentMethod', routePaymentMethod);
app.use('/order', routeOrder);
app.use('/productTest', routeProductTest);

app.use('/brandCategory', routeBrandCategory);






app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})