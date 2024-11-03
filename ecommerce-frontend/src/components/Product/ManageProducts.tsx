import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteProduct = (productId: string) => {
    axios.delete(`/products/${productId}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== productId));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <ul>
        {products.map((product: any) => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
