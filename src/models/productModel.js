// productModel.js
const db = require('../../dbConfig');

class Product {
  static async getAllProducts() {
    try {
      const [products] = await db.execute('SELECT * FROM products');
      return products;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(productId) {
    try {
      const [product] = await db.execute('SELECT * FROM product_details WHERE id = ?', [productId]);
      return product.length ? product[0] : null;
    } catch (error) {
      throw error;
    }
  }

  
}

module.exports = Product;
