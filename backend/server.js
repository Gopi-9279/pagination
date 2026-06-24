import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Product from './models/Product.js';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Cursor Encoding/Decoding Helpers
const encodeCursor = (date, id) => {
  const cursorStr = `${date.getTime()}|${id}`;
  return Buffer.from(cursorStr).toString('base64');
};

const decodeCursor = (cursorStr) => {
  const decoded = Buffer.from(cursorStr, 'base64').toString('ascii');
  const [timestamp, id] = decoded.split('|');
  return { time: parseInt(timestamp, 10), id };
};

// API Route
app.get('/api/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 20;
    const { category, cursor } = req.query;

    let query = {};

    if (category) query.category = category;

    if (cursor) {
      const { time, id } = decodeCursor(cursor);
      const cursorDate = new Date(time);

      // The core cursor logic: older timestamp OR exact same timestamp with a smaller ID
      query.$or = [
        { createdAt: { $lt: cursorDate } },
        { createdAt: cursorDate, _id: { $lt: id } }
      ];
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit);

    let next_cursor = null;
    if (products.length === limit) {
      const lastProduct = products[products.length - 1];
      next_cursor = encodeCursor(lastProduct.createdAt, lastProduct._id.toString());
    }

    res.json({ data: products, next_cursor });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

mongoose.connect('mongodb://localhost:27017/inventory')
  .then(() => {
    app.listen(8000, () => console.log('Backend running on http://localhost:8000'));
  });