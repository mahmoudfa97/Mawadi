import React from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartProps {
  cartItems: Product[];
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, clearCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    axios.post('http://localhost:5000/products/checkout', { cartItems })
      .then(response => {
        alert(`Checkout successful! Total: $${response.data.total}`);
        clearCart();
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
      <p>Total: ${total}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
