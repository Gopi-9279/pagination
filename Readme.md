# ⚡ Single-File Inventory Pagination Demo

A zero-setup, fully functional demonstration of **Cursor-Based Pagination** handling **200,000 records** entirely within your browser.

This playground simulates a high-performance MERN stack backend without requiring **Node.js, MongoDB, Express, or any build tools**. It is designed for understanding pagination concepts, testing UI interactions, and visualizing how cursor-based pagination works in production systems.

---

## ✨ Features

### 🚀 Zero Installation
Runs entirely from a single `.html` file.

### 📦 Massive Mock Database
Generates **200,000 product records** instantly in browser memory using JavaScript's `Array.from()`.

### 🔄 Production-Style Cursor Pagination
Implements a **composite cursor strategy** using:

- Timestamp (`createdAt`)
- Unique Product ID (`_id`)

This mirrors real-world implementations used in scalable databases.

### ⏳ Simulated Network Latency
Includes an artificial delay (**400ms**) to mimic real API calls and demonstrate loading states.

### ⚛️ Modern Frontend Stack via CDN
Uses:

- React 18
- ReactDOM
- Babel (JSX Compilation)
- Bootstrap 5

All loaded directly from CDNs with no package installation required.

---

## 🚀 Getting Started

### Step 1: Create the HTML File

Create a file named:

```bash
index.html