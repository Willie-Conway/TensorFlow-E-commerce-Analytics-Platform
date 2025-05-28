// server/routes/analytics.js - Analytics routes
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// Replace this line:
// const tf = require('@tensorflow/tfjs-node');
// With this line:
const tf = require('@tensorflow/tfjs');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @route   GET api/analytics/sales
// @desc    Get sales data
// @access  Private
router.get('/sales', auth, async (req, res) => {
  try {
    // Get sales data grouped by day
    const salesData = await Order.aggregate([
      {
        $match: {
          status: 'completed',
          createdAt: {
            $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalSales: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json(salesData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/analytics/predict
// @desc    Predict future sales
// @access  Private
router.get('/predict', auth, async (req, res) => {
  try {
    // Get historical sales data
    const salesData = await Order.aggregate([
      {
        $match: {
          status: 'completed',
          createdAt: {
            $gte: new Date(new Date() - 90 * 24 * 60 * 60 * 1000) // Last 90 days
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalSales: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    if (salesData.length < 30) {
      return res.status(400).json({ msg: 'Not enough data for prediction' });
    }

    // Prepare data for TensorFlow
    const dates = salesData.map(item => new Date(item._id).getTime());
    const sales = salesData.map(item => item.totalSales);

    // Normalize data
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const minSales = Math.min(...sales);
    const maxSales = Math.max(...sales);

    const normalizedDates = dates.map(d => (d - minDate) / (maxDate - minDate));
    const normalizedSales = sales.map(s => (s - minSales) / (maxSales - minSales));

    // Create TensorFlow model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, inputShape: [1], activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    // Convert data to tensors
    const xs = tf.tensor2d(normalizedDates, [normalizedDates.length, 1]);
    const ys = tf.tensor2d(normalizedSales, [normalizedSales.length, 1]);

    // Train the model
    await model.fit(xs, ys, { epochs: 100 });

    // Predict next 7 days
    const futureDates = [];
    const predictionDays = 7;
    for (let i = 1; i <= predictionDays; i++) {
      futureDates.push(new Date(maxDate + i * 24 * 60 * 60 * 1000).getTime());
    }

    const normalizedFutureDates = futureDates.map(d => (d - minDate) / (maxDate - minDate));
    const futureXs = tf.tensor2d(normalizedFutureDates, [predictionDays, 1]);

    const predictions = model.predict(futureXs);
    const predictedValues = (await predictions.dataSync()).map(
      val => val * (maxSales - minSales) + minSales
    );

    // Format response
    const result = futureDates.map((date, i) => ({
      date: new Date(date).toISOString().split('T')[0],
      predictedSales: predictedValues[i]
    }));

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Other analytics routes would go here

module.exports = router;