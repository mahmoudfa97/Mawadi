// StockAndDelivery.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import StockAndDelivery from './StockAndDelivery';

describe('StockAndDelivery Component', () => {
  it('renders StockAndDelivery component', () => {
    const { getByText } = render(<StockAndDelivery />);
    expect(getByText(/In Stock/i)).toBeInTheDocument();
    expect(getByText(/Free delivery available/i)).toBeInTheDocument();
    expect(getByText(/Sales 10% Off!/i)).toBeInTheDocument();
  });
});
