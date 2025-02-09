const express = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');

const bodyParser = require('body-parser');
const userController = require('../controller/userController');
const categoryController = require('../controller/categoryController');
const productController = require('../controller/productController');
const quantityController = require('../controller/quantityController');

const PORT = 3002;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Ensure form data parsing
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

// User Routes
app.post('/api/users/register', userController.userRegister);
app.post('/api/users/login', userController.userLogin);
app.post('/api/users/logout', userController.userLogout);
app.get('/api/users/validate-email', userController.validateEmail);

app.get('/api/category/fetch', categoryController.categoryFetch);
app.post('/api/category/store', categoryController.categoryStore);

app.get('/api/product/fetch', productController.productFetch);
app.post('/api/product/store', productController.productStore);
app.get('/api/product/view/:item_code', productController.productView);
app.get('/api/product-related/view/:ctgy_id/:item_code', productController.productRelatedView);
app.get('/api/product/edit/:item_code', productController.productEdit);

app.post('/api/quantity/store', quantityController.quantityStore);


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = app;
