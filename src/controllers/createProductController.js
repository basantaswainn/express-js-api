const express = require('express');
const { authenticateToken } = require('../../middleware/authMiddleware');
const Product = require('../../src/models/productModel');

const router = express.Router();


router.get('/create-product', authenticateToken, async (req, res) => {
  try {
    // Extracting name and mobile from request body
    const { name, price} = req.body;
    const productName = name;
    const productPrice = price;
    // Use the Product model to fetch the product by ID
    const product = await Product.createProduct(productName,productPrice);

    if (product) {
     // Sending a successful response
     res.status(201).json({ code: 201, status: 'Product Created Successfully' });
    }

   
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, status: 'Internal Server Error' });
  }
});

module.exports = router;
