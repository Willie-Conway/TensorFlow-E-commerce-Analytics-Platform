// server/routes/products.js - Product routes
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const Product = require('../models/Product');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/products/performance
// @desc    Get product performance data (sales, stock, views)
// @access  Public
router.get('/performance', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    // Map to only include relevant fields for performance chart
    const performanceData = products.map(product => ({
      name: product.name,
      sales: product.sales || 0,   // Ensure your Product model has 'sales' field
      stock: product.stock,
      views: product.views || 0    // Ensure your Product model has 'views' field
    }));

    res.json(performanceData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/products
// @desc    Add new product
// @access  Private/Admin
router.post(
  '/',
  [
    auth,
    admin,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('price', 'Price is required').isNumeric(),
      check('category', 'Category is required').not().isEmpty(),
      check('stock', 'Stock is required').isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, category, stock } = req.body;

    try {
      const newProduct = new Product({
        name,
        price,
        category,
        stock
      });

      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Other product routes (update, delete, etc.) would go here

module.exports = router;
