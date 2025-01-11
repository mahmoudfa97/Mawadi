// CreateProductPage.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import CreateProductPage from './CreateProductPage';

test('renders CreateProductPage component', () => {
  const { getByText } = render(<CreateProductPage />);
  expect(getByText(/Create Product/i)).toBeInTheDocument(); // Assuming there's a heading with "Create Product"
});
