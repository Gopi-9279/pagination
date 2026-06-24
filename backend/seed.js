import mongoose from 'mongoose';
import Product from './models/Product.js';

const MONGO_URI = 'mongodb://localhost:27017/inventory';

const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Beauty', 'Sports'];
const adjectives = ['Ultra', 'Smart', 'Eco', 'Premium', 'Deluxe', 'Classic'];
const nouns = ['Widget', 'Gadget', 'Outfit', 'Pack', 'Device', 'Item'];

async function seedDatabase() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB.');

  await Product.deleteMany({});
  console.log('Cleared existing products.');

  const totalRecords = 200000;
  const batchSize = 10000;
  const baseTime = Date.now();

  console.log(`Generating ${totalRecords} products in batches of ${batchSize}...`);

  for (let i = 0; i < totalRecords; i += batchSize) {
    const batch = [];
    
    for (let j = 0; j < batchSize; j++) {
      const index = i + j;
      const name = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]} ${index}`;
      const category = categories[Math.floor(Math.random() * categories.length)];
      const price = Number((Math.random() * 495 + 5).toFixed(2));
      
      // Stagger timestamps
      const createdAt = new Date(baseTime - (index * 1000));

      batch.push({ name, category, price, createdAt, updatedAt: createdAt });
    }

    // ordered: false dramatically increases insertion speed
    await Product.insertMany(batch, { ordered: false });
    console.log(`Inserted ${i + batchSize} / ${totalRecords}`);
  }

  console.log('Successfully seeded 200,000 records!');
  mongoose.disconnect();
}

seedDatabase().catch(console.error);