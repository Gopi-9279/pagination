⚡ Single-File Inventory Pagination Demo
A zero-setup, fully functional demonstration of Cursor-Based Pagination handling 200,000 records entirely within your browser.

This playground simulates a high-performance MERN stack backend without requiring Node.js, MongoDB, or a complex build environment. It is perfect for testing UI micro-interactions and understanding the underlying cursor logic in an isolated environment.

✨ Features
Zero Installation: Runs entirely from a single .html file.

Massive Mock Database: Instantly generates 200,000 product records in your browser's memory using Array.from().

Authentic Cursor Logic: Replicates the exact timestamp/ID composite cursor algorithm used in high-volume production databases.

Simulated Network Latency: Includes artificial delays (400ms) to demonstrate loading states and micro-interactions accurately.

Modern Tech via CDN: Uses React 18, Babel (for JSX compilation), and Bootstrap 5 delivered directly via CDNs.

🚀 How to Run
Create a new file on your computer named index.html.

Copy the single-file HTML code provided previously and paste it into index.html.

Double-click the file to open it in Chrome, Edge, Firefox, or Safari.

That's it! No servers, no npm install, no database setup.

🧠 Architecture Overview
Because this is a monolithic playground, the standard client-server model is simulated using JavaScript functions:

The "Database": MOCK_DB acts as our database instance, holding the 200,000 records in memory.

The "Backend API": The mockFetchProducts() function simulates an Express.js route. It accepts a cursor string, decodes it, applies the mathematical filtering logic, and returns a simulated JSON payload alongside the next_cursor.

The "Frontend": Standard React components (App and ProductCard) handle the state management and UI rendering exactly as they would in a Vite or Next.js environment.

🛠️ Modifying the Data
If you want to test different data volumes or pagination limits, you can easily tweak the variables directly inside the HTML file:

Change Total Records: Modify length: 200000 inside the generateMockData() function.

Change Page Size: Modify limit = 20 inside the mockFetchProducts() function parameters to test smaller or larger page sizes.

Change Artificial Delay: Modify the setTimeout(resolve, 400) value to simulate faster or slower network connections.