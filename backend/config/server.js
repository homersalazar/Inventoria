const express = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');

const bodyParser = require('body-parser');
const userController = require('../controller/userController');
const categoryController = require('../controller/categoryController');

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

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = app;
