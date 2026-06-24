import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const MONGO_URI = process.env.MONGO_URI ;
const DB_NAME = 'inventory';

const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Beauty', 'Sports'];
const adjectives = ['Ultra', 'Smart', 'Eco', 'Premium', 'Deluxe', 'Classic'];
const nouns = ['Widget', 'Gadget', 'Outfit', 'Pack', 'Device', 'Item'];

async function seedDatabase() {
  
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection('products');
    
    console.log('Connected to MongoDB.');

    // 1. Clear existing data
    await collection.deleteMany({});
    console.log('Cleared existing products.');

    // 2. Create the crucial Compound Index manually for fast pagination
    await collection.createIndex({ category: 1, createdAt: -1, _id: -1 });
    console.log('Database index created.');

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
        
        // Stagger timestamps by 1 second to ensure unique cursor coordinates
        const createdAt = new Date(baseTime - (index * 1000));

        batch.push({ name, category, price, createdAt, updatedAt: createdAt });
      }

      // 'ordered: false' allows MongoDB to insert the batch in parallel, maximizing speed
      await collection.insertMany(batch, { ordered: false });
      console.log(`Inserted ${i + batchSize} / ${totalRecords}`);
    }

    console.log('Successfully seeded 200,000 records!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await client.close();
    console.log('Disconnected from database.');
  }
}

seedDatabase();