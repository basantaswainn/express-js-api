// productListRoute.js
const express = require('express');
const { authenticateToken } = require('../../middleware/authMiddleware');
const Product = require('../../src/models/productModel');

const router = express.Router();

// Get product list with authentication
router.get('/product-list', authenticateToken, async (req, res) => {
  try {
    // Use the Product model to fetch products
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
