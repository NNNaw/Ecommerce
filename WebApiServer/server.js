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
var routeBrandCategory = require('./_routes/brandCategories.route')


var routeProductTest = require('./_routes/productTest.route');
const { json } = require('body-parser');

var ad = { Name: "Luc" }

app.use(express.static(__dirname + '/_public'));

app.use('/products', routeProduct);

app.use('/accounts', routeAccount);
app.use('/category', routeCategory);
app.use('/brand', routeBrand);
app.use('/brandCategory', routeBrandCategory);

app.use('/productTest', routeProductTest);

app.get("/", function (req, res) {
  res.send(ad)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})