// StockAndDelivery.tsx
// Purpose: Renders information about the stock status and delivery options for a product.
// Main Functionalities:
// - Displays whether the product is in stock.
// - Indicates if free delivery is available.
// - Shows any ongoing sales or discounts.

import React from "react";

const StockAndDelivery: React.FC = () => {
  return (
    <div className="space-y-2 text-sm">
      <p className="flex items-center gap-2">
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        In Stock
      </p>
      <p className="flex items-center gap-2">
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Free delivery available
      </p>
      <p className="flex items-center gap-2">
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Sales 10% Off!
      </p>
    </div>
  );
};

export default StockAndDelivery;
