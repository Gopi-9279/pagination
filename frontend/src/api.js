export async function fetchProducts(categoryName, cursorString) {
  const baseUrl = '/api/products';
  
  // FIX: Added window.location.origin to safely construct the full URL
  const url = new URL(baseUrl, window.location.origin);
  
  if (categoryName && categoryName !== "All") {
    url.searchParams.append('category', categoryName);
  }
  if (cursorString) {
    url.searchParams.append('cursor', cursorString);
  }

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('Network response was not ok');
  
  const json = await response.json();
  
  // Map the MongoDB _id to standard id for the frontend
  const mappedData = json.data.map(item => ({
    ...item,
    id: item._id, 
  }));

  return { data: mappedData, next_cursor: json.next_cursor };
}