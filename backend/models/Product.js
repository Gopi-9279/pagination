import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Crucial Index: Enables O(log N) instantaneous cursor lookups
productSchema.index({ category: 1, createdAt: -1, _id: -1 });

export default mongoose.model('Product', productSchema);