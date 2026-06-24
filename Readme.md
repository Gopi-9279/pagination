# ⚡ Single-File Inventory Pagination Demo

A zero-setup, fully functional demonstration of Cursor-Based Pagination handling 200,000 records entirely within your browser.

This playground simulates a high-performance MERN stack backend without requiring Node.js, MongoDB, Express, or any build tools. It is designed for understanding pagination concepts, testing UI interactions, and visualizing how cursor-based pagination works in production systems.

## ✨ Features

- 🚀 Zero Installation — Runs entirely from a single `.html` file.
- 📦 Massive Mock Database — Generates 200,000 product records instantly using `Array.from()`.
- 🔄 Production-Style Cursor Pagination — Uses a composite cursor strategy based on `createdAt` and `_id`.
- ⏳ Simulated Network Latency — Includes a 400ms delay to mimic real API calls.
- ⚛️ Modern Frontend Stack — React 18, Babel, and Bootstrap 5 loaded directly from CDNs.

## 🚀 Getting Started

### 1. Create the HTML File

Create a file named:

```bash
index.html
```

### 2. Paste the Code

Copy the provided single-file pagination demo code and paste it into `index.html`.

### 3. Open in Browser

Double-click the file or open it using:

- Chrome
- Edge
- Firefox
- Safari

No installation, package manager, database, or server is required.

---

## 🧠 Architecture Overview

This project simulates a complete client-server architecture within a single HTML file.

### Database Layer

```javascript
MOCK_DB
```

Acts as an in-memory database containing 200,000 generated product records.

### Backend Layer

```javascript
mockFetchProducts()
```

Simulates an Express.js API endpoint by:

- Accepting cursor values
- Decoding cursor information
- Applying pagination filters
- Returning paginated data
- Generating the next cursor

Example response:

```json
{
  "products": [...],
  "next_cursor": "encoded_cursor_value"
}
```

### Frontend Layer

React components manage:

- Product rendering
- Pagination state
- Loading states
- Cursor tracking
- Infinite navigation

Main components:

```javascript
App
ProductCard
```

---

## 🔍 Cursor-Based Pagination Logic

Instead of offset pagination:

```sql
LIMIT 20 OFFSET 1000
```

The application uses cursor pagination:

```sql
WHERE
(createdAt < cursorCreatedAt)
OR
(createdAt = cursorCreatedAt AND _id < cursorId)
```

### Advantages

- Faster database queries
- No duplicate records
- No missing records
- Consistent results during data updates
- Better scalability for large datasets

---

## 📊 Mock Data Structure

Each product contains:

```javascript
{
  _id: "product_12345",
  name: "Product 12345",
  category: "Electronics",
  price: 999,
  createdAt: "2026-06-20T10:00:00Z"
}
```

Records are sorted by:

1. `createdAt DESC`
2. `_id DESC`

---

## ⚙️ Customization

### Change Total Records

Locate:

```javascript
Array.from({ length: 200000 })
```

Example:

```javascript
Array.from({ length: 500000 })
```

### Change Page Size

Locate:

```javascript
limit = 20
```

Example:

```javascript
limit = 50
```

### Change Network Delay

Locate:

```javascript
setTimeout(resolve, 400)
```

Examples:

```javascript
setTimeout(resolve, 100)
```

Fast connection simulation

```javascript
setTimeout(resolve, 1000)
```

Slow connection simulation

---

## 🎯 Learning Objectives

This project demonstrates:

- Cursor-Based Pagination
- Infinite Scrolling Concepts
- Composite Cursor Generation
- Frontend State Management
- API Simulation
- Large Dataset Handling
- Performance Optimization
- Production-Ready Pagination Patterns

---

## 📈 Why Cursor Pagination?

Offset pagination:

```sql
LIMIT 20 OFFSET 100000
```

requires the database to scan and skip thousands of records before returning results.

Cursor pagination:

```sql
WHERE createdAt < cursorTimestamp
```

starts directly from the last fetched record, making it significantly faster and more scalable.

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|----------|
| HTML5 | Structure |
| React 18 | UI Rendering |
| ReactDOM | DOM Manipulation |
| Babel | JSX Compilation |
| Bootstrap 5 | Styling |
| JavaScript ES6+ | Application Logic |

---

## 📜 License

This project is intended for educational purposes and demonstrates high-performance cursor-based pagination techniques commonly used in production applications.
