// AboutUs.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AboutUs from './AboutUs';
import axios from 'axios';

// Mock the axios module
jest.mock('axios');

describe('AboutUs Component', () => {
  it('renders AboutUs component', async () => {
    // Mock the API response
    const mockResponse = {
      data: {
        title: 'About Us',
        intro: 'Welcome to our company.',
        mission: 'To provide the best service.',
        team: 'Our team is dedicated and skilled.',
        aboutUs: 'Learn more about us here.',
      },
    };
    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { getByText } = render(<AboutUs />);

    // Wait for the translations to be fetched and rendered
    await waitFor(() => {
      expect(getByText(/Welcome to our company/i)).toBeInTheDocument();
      expect(getByText(/To provide the best service/i)).toBeInTheDocument();
      expect(getByText(/Our team is dedicated and skilled/i)).toBeInTheDocument();
    });
  });

  it('displays loading state initially', () => {
    const { getByText } = render(<AboutUs />);
    expect(getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('handles error when fetching translations', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Error fetching translations'));

    const { getByText } = render(<AboutUs />);

    // Wait for the error handling to be rendered
    await waitFor(() => {
      expect(getByText(/Error fetching translations/i)).toBeInTheDocument(); // Assuming you handle errors in the component
    });
  });
});
