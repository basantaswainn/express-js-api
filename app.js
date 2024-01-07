const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbConfig'); // Import the database connection details
const registerController = require('./src/controllers/register');
const loginController = require('./src/controllers/login');
const productController = require('./src/controllers/product');
const { authenticateToken } = require('./middleware/authMiddleware');
const productDetailsRoute = require('./src/controllers/productDetailsRoute');

const app = express();
const port = 4000;

app.use(bodyParser.json());

// Register, Login, and Product routes
app.use('/register', registerController);
app.use('/login', loginController);
app.use('/', authenticateToken, productController);
app.use('/', authenticateToken, productDetailsRoute);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
