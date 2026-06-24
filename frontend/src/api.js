export async function fetchProducts(categoryName, cursorString) {
  const baseUrl = 'http://localhost:8000/api/products';
  const url = new URL(baseUrl);
  
  if (categoryName && categoryName !== "All") {
    url.searchParams.append('category', categoryName);
  }
  if (cursorString) {
    url.searchParams.append('cursor', cursorString);
  }

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('Network response was not ok');
  
  const json = await response.json();
  
  const mappedData = json.data.map(item => ({
    ...item,
    id: item._id, 
  }));

  return { data: mappedData, next_cursor: json.next_cursor };
}