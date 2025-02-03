const express = require("express");
const cors = require('cors');

const bodyParser = require('body-parser');
const userController = require('../controller/userController');

const PORT = 3002;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// User Routes
app.post('/api/users/register', userController.userRegister);
app.post('/api/users/login', userController.userLogin);
app.post('/api/users/logout', userController.userLogout);
app.get('/api/users/validate-email', userController.validateEmail);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = app;
