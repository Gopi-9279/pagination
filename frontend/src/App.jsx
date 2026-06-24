// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import { fetchProducts } from "./api";
import ProductCard from "./components/ProductCard";

const CATEGORIES = ["All", "Electronics", "Clothing", "Home", "Books", "Beauty", "Sports"];

export default function App() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cursor, setCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    async function loadInitial() {
      setIsLoading(true);
      try {
        const data = await fetchProducts(activeCategory);
        setProducts(data.data);
        setCursor(data.next_cursor);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitial();
  }, [activeCategory]);

  const loadMore = async () => {
    if (!cursor) return;
    setIsFetchingMore(true);
    try {
      const data = await fetchProducts(activeCategory, cursor);
      setProducts((prev) => [...prev, ...data.data]);
      setCursor(data.next_cursor);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  return (
    <div className="min-vh-100 py-5">
      <div className="container px-3 px-md-4">
        
        {/* Premium Header */}
        <header className="text-center mb-5 pt-4">
          <h1 className="display-3 fw-bolder mb-3 text-gradient" style={{ letterSpacing: '-2px' }}>
            Inventory Catalog
          </h1>
          <p className="lead text-secondary" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Seamlessly browse through over 200,000+ items with real-time updates and lightning-fast pagination.
          </p>
        </header>

        {/* Custom Category Filter */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn rounded-pill px-4 py-2 category-pill ${
                activeCategory === cat ? "active-pill text-white" : "text-muted bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
            <div className="spinner-border text-secondary" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="row g-4 g-lg-5">
              {products.map((product) => (
                <div key={product.id} className="col-12 col-sm-6 col-md-4 col-xl-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {!isLoading && products.length === 0 && (
              <div className="text-center py-5 my-5 bg-white rounded-4 shadow-sm border border-light">
                <p className="text-secondary fs-5 mb-0 py-4 fw-medium">No products found in this category.</p>
              </div>
            )}

            {/* Premium Load More Button */}
            {cursor && (
              <div className="d-flex justify-content-center mt-5 pt-4 pb-5">
                <button
                  onClick={loadMore}
                  disabled={isFetchingMore}
                  className="btn btn-load-more btn-lg rounded-pill px-5 py-3 shadow-sm text-uppercase tracking-wide"
                >
                  {isFetchingMore ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
                      Loading Data...
                    </>
                  ) : (
                    "Load More Products"
                  )}
                </button>
              </div>
            )}

            {/* End of Line Indicator */}
            {!cursor && products.length > 0 && (
              <div className="text-center mt-5 pt-4 pb-5">
                <div className="d-inline-block px-4 py-2 rounded-pill bg-white border shadow-sm text-secondary fw-medium" style={{ fontSize: '0.9rem' }}>
                  <span className="me-2">✨</span> You've reached the end of the catalog
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}