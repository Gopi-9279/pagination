// frontend/src/components/ProductCard.jsx
import React from 'react';

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="card h-100 product-card rounded-4 overflow-hidden">
      
      {/* Aesthetic Image Area */}
      <div 
        className="card-img-top image-placeholder d-flex align-items-center justify-content-center position-relative" 
        style={{ height: '220px' }}
      >
        <span className="text-secondary fw-bolder text-uppercase opacity-50" style={{ letterSpacing: '3px', fontSize: '0.85rem' }}>
          {product?.category || 'Preview'}
        </span>
      </div>
      
      <div className="card-body d-flex flex-column p-4">
        {/* Badge area */}
        <div className="mb-3">
          <span 
            className="badge rounded-pill bg-secondary bg-opacity-10 text-secondary px-3 py-2 text-uppercase fw-bold" 
            style={{ letterSpacing: '0.5px', fontSize: '0.7rem' }}
          >
            {product?.category || 'Uncategorized'}
          </span>
        </div>
        
        {/* Product Name */}
        <h5 
          className="card-title fw-bold mb-3 text-dark" 
          style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden',
            lineHeight: '1.4'
          }} 
          title={product?.name}
        >
          {product?.name || 'Unknown Product'}
        </h5>
        
        {/* Bottom Section: Price & Date */}
        <div className="mt-auto d-flex justify-content-between align-items-end pt-4 border-top" style={{ borderColor: 'rgba(0,0,0,0.04) !important' }}>
          <div>
            <span className="fs-3 fw-bolder text-dark" style={{ letterSpacing: '-1px' }}>
              ${product?.price ? product.price.toFixed(2) : '0.00'}
            </span>
          </div>
          <small className="text-secondary fw-medium pb-1" style={{ fontSize: '0.8rem' }}>
            {product?.createdAt 
              ? new Date(product.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
              : 'Unknown Date'}
          </small>
        </div>
      </div>
    </div>
  );
}