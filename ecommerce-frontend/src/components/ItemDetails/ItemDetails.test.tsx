// ItemDetails.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import ItemDetails from './ItemDetails';
import { IProduct } from '../../types/Constants';

describe('ItemDetails Component', () => {
  const mockItem: IProduct = {
    id: 1,
    name: 'Test Item',
    price: 50,
    description: 'This is a test item.',
    image: 'test_item.jpg',
    additionalImages: ['test_item_1.jpg', 'test_item_2.jpg'],
    reviews: [],
    status: 'available',
    brand: 'Test Brand',
    category: 'Test Category',
    weight: '100g', // Updated to string
    gender: 'Unisex', // Added missing property
    dimensions: '5x5x5', // Added missing property
    discount: '0', // Updated to string
    originalPrice: 50,
    currency: 'ILS', // Added missing property
    rating: 4, // Added missing property
    colors: ['red', 'blue'], // Added missing property
    tax: 5, // Added missing property
    sizes: ['S', 'M', 'L'], // Added missing property
    tags: ['test', 'item'],
    occasion: ['Gift'],
    personalization: {
      videoFile: new File([], 'video.mp4'), // Updated to match expected type
      customMessage: 'Happy Birthday',
    },
    type: 'accessory', // Added missing property
    SKU: 12345, // Updated to number
    inStock: {
      left: 10, // Updated to match expected type
      sold: 5, // Updated to match expected type
    },
    productCode: 'TEST-ITEM-001',
    salesCount: 0,
    dateAdded: new Date().toISOString(),
    deliveryTime: '24 hours',
    estimatedDeliveryDate: new Date().toISOString(),
    features: ['Feature A', 'Feature B'],
    peopleAlsoBuy: [{ name: 'Another Item', price: 30 }],
    tagNumber: ''
  };

  it('renders ItemDetails component', () => {
    const { getByText } = render(<ItemDetails item={mockItem} />);
    expect(getByText(/Test Item/i)).toBeInTheDocument();
    expect(getByText(/This is a test item/i)).toBeInTheDocument();
  });
});
