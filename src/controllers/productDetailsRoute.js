// productDetailsRoute.js
const express = require('express');
const { authenticateToken } = require('../../middleware/authMiddleware');
const Product = require('../../src/models/productModel');

const router = express.Router();

// Get product details by ID with authentication
router.get('/product-details/:productId', authenticateToken, async (req, res) => {
   
  try {
    const productId = req.params.productId;
   
    // Use the Product model to fetch the product by ID
    const product = await Product.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
