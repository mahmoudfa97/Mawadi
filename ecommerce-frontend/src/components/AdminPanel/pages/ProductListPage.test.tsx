// ProductListPage.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import ProductListPage from './ProductListPage';

test('renders ProductListPage component', () => {
  const { getByText } = render(<ProductListPage />);
  expect(getByText(/Product List/i)).toBeInTheDocument(); // Assuming there's a heading with "Product List"
});
