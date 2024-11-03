import React, { ReactNode } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // Importing the component correctly

// Define the props interface with children as a ReactNode
interface PayPalWrapperProps {
  children: ReactNode;
}

const PayPalWrapper: React.FC<PayPalWrapperProps> = ({ children }) => {
  const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID!,
    currency: "ILS",
    intent: "capture",
};

  return (
    <PayPalScriptProvider 
      options={initialOptions}>
      {children} {/* This is valid JSX */}
    </PayPalScriptProvider>
  );
};

export default PayPalWrapper;
