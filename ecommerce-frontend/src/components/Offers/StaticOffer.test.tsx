// StaticOffer.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import StaticOffer from './StaticOffer';

describe('StaticOffer Component', () => {
  it('renders StaticOffer component', () => {
    const { getByText } = render(<StaticOffer />);
    expect(getByText(/Available offers/i)).toBeInTheDocument();
    expect(getByText(/Bank Offer: 10% instant discount/i)).toBeInTheDocument();
  });
});
