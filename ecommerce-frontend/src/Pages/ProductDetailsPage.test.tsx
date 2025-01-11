// ProductDetailsPage.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ProductDetailsPage from './ProductDetailsPage';
import { useLocation } from 'react-router-dom';
import { IProduct } from '../types/Constants';

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('ProductDetailsPage Component', () => {
  const mockProduct: IProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    description: 'This is a test product.',
    image: 'test_image.jpg',
    additionalImages: ['test_image_1.jpg', 'test_image_2.jpg'],
    reviews: [],
    status: 'available',
    brand: 'Test Brand',
    category: 'Test Category',
    weight: '200',
    dimensions: '10x10x10',
    discount: '0',
    originalPrice: 100,
    tags: ['test', 'product'],
    occasion: ['Birthday'],
    personalization: {
      customMessage: ''
    },
    inStock: {
      left: 0,
      sold: 0
    },
    SKU: 1,
    productCode: 'TP-001',
    salesCount: 0,
    dateAdded: new Date().toISOString(),
    deliveryTime: '24 hours',
    estimatedDeliveryDate: new Date().toISOString(),
    features: ['Feature 1', 'Feature 2'],
    peopleAlsoBuy: [{ name: 'Another Product', price: 50 }],
    gender: '',
    currency: '',
    rating: 0,
    colors: [],
    tax: 0,
    tagNumber: '',
    sizes: [],
    type: ''
  };

  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({ state: mockProduct });
  });

  it('renders ProductDetailsPage component', async () => {
    const { getByText } = render(<ProductDetailsPage />);
    
    // Wait for the product details to be rendered
    await waitFor(() => {
      expect(getByText(/Test Product/i)).toBeInTheDocument();
      expect(getByText(/This is a test product/i)).toBeInTheDocument();
    });
  });

  it('displays loading state initially', () => {
    const { getByText } = render(<ProductDetailsPage />);
    expect(getByText(/Loading.../i)).toBeInTheDocument(); // Assuming there's a loading state
  });

  // Add more tests for functionality like adding to cart, displaying reviews, etc.
});
