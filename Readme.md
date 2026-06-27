# Inventory Catalog - Cursor Pagination Demo

A full-stack product catalog built to demonstrate fast, scalable cursor-based pagination with MongoDB Atlas. The project uses a React + Vite frontend, an Express API, MongoDB/Mongoose for data access, and Vercel for deployment.

The app displays an inventory grid, supports category filtering, and loads more products using a cursor instead of offset/skip pagination. This keeps pagination efficient even with a large collection such as 200,000 products.

## Features

- Product catalog UI built with React and Bootstrap
- Category filters for `Electronics`, `Clothing`, `Home`, `Books`, `Beauty`, and `Sports`
- Cursor-based pagination using `createdAt` and `_id`
- MongoDB Atlas backend with Mongoose
- Seed script that creates 200,000 sample products
- Compound index for fast pagination queries
- Vercel configuration for deploying frontend and backend together

## Tech Stack

### Frontend

- React
- Vite
- Bootstrap
- Custom CSS styling

### Backend

- Node.js
- Express
- Mongoose
- MongoDB Atlas
- CORS

### Deployment

- Vercel

## Project Structure

```txt
pagination/
├── backend/
│   ├── models/
│   │   └── Product.js
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProductCard.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
└── vercel.json
```

## How It Works

The frontend calls:

```txt
GET /api/products
```

The backend fetches products from MongoDB, sorted by newest first:

```js
.sort({ createdAt: -1, _id: -1 })
```

When a page is returned, the backend creates a `next_cursor` from the last product's `createdAt` and `_id`. The frontend sends that cursor with the next request:

```txt
GET /api/products?cursor=<next_cursor>
```

This lets MongoDB continue from the last item without using slow offset pagination.

## API

### Get Products

```txt
GET /api/products
```

Optional query parameters:

| Parameter | Description |
| --- | --- |
| `limit` | Number of products to return. Defaults to `20`. |
| `category` | Filters products by category. |
| `cursor` | Cursor returned from the previous response. |

Example:

```txt
GET /api/products?category=Electronics&limit=20
```

Response:

```json
{
  "data": [
    {
      "_id": "mongodb-object-id",
      "name": "Premium Gadget 1",
      "category": "Electronics",
      "price": 149.99,
      "createdAt": "2026-06-24T10:00:00.000Z",
      "updatedAt": "2026-06-24T10:00:00.000Z"
    }
  ],
  "next_cursor": "encoded-cursor-value"
}
```

When there are no more products:

```json
{
  "data": [],
  "next_cursor": null
}
```

## MongoDB Data Model

The `Product` model contains:

```js
{
  name: String,
  category: String,
  price: Number,
  createdAt: Date,
  updatedAt: Date
}
```

Mongoose maps the `Product` model to the MongoDB collection:

```txt
products
```

The expected MongoDB location is:

```txt
database: inventory
collection: products
```

## Database Index

The project uses this compound index:

```js
{ category: 1, createdAt: -1, _id: -1 }
```

This index supports both category filtering and cursor pagination.

## Environment Variables

Create an environment variable named:

```txt
MONGO_URI
```

Example:

```txt
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/inventory?retryWrites=true&w=majority
```

Important: include `/inventory` in the URI so the app connects to the correct database.

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Gopi-9279/pagination.git
cd pagination
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Add Backend Environment Variable

Create `backend/.env`:

```txt
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/inventory?retryWrites=true&w=majority
```

### 4. Seed the Database

From the `backend` folder:

```bash
node seed.js
```

This script:

- connects to the `inventory` database
- clears the existing `products` collection
- creates the pagination index
- inserts 200,000 sample products

### 5. Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 6. Run the Frontend

```bash
npm run dev
```

The frontend runs on:

```txt
http://localhost:5173
```

## Vercel Deployment

The project includes a `vercel.json` file that deploys:

- `backend/server.js` as a Vercel Node function
- `frontend` as a static Vite build

API requests are routed through:

```txt
/api/*
```

Example production endpoint:

```txt
https://your-vercel-app.vercel.app/api/products
```

### Required Vercel Environment Variable

In Vercel, add:

```txt
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/inventory?retryWrites=true&w=majority
```

After adding or changing environment variables, redeploy the project.

## Troubleshooting

### `/api/products` returns `{"data":[],"next_cursor":null}`

This means the backend route is working, but MongoDB returned zero products.

Check:

- the URI includes `/inventory`
- the collection name is `products`
- the `products` collection contains documents
- the documents have `name`, `category`, `price`, and `createdAt`

### MongoDB connects locally but not on Vercel

Check:

- `MONGO_URI` is added in Vercel
- the variable name is exactly `MONGO_URI`
- the Atlas password is URL-encoded if it contains special characters
- Atlas Network Access allows Vercel connections

For Atlas Network Access during development, you can allow access from anywhere:

```txt
0.0.0.0/0
```

### Browser shows CORS errors

The backend currently allows:

```js
app.use(cors({ origin: 'http://localhost:5173' }));
```

For production, update it to include your Vercel domain or use:

```js
app.use(cors());
```

### Products do not render correctly

Each product should include:

```txt
name
category
price
createdAt
```

The frontend displays product category, name, price, and creation date.

## Notes

- The app uses cursor pagination instead of `skip()` for better performance with large datasets.
- The seed script intentionally staggers timestamps so cursor pagination has stable ordering.
- The backend sorts by both `createdAt` and `_id` to avoid duplicate or missing results when timestamps match.

## License

This project is open source and available for learning and experimentation.
