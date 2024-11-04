import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { del, get } from '../../services/api';
import { toast } from '../../utils/toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../UI/Table';
import { Button } from '../UI/button';
import { Input } from '../UI/Input';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await get<Product[]>('/products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      toast('Failed to fetch products. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
      try {
        await del(`/products/${productId}`);
        setProducts(products.filter(product => product._id !== productId));
        toast('Product deleted successfully.');
      } catch (err) {
        toast('Failed to delete product. Please try again.', 'error');
      }
    
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Button onClick={() => navigate('/admin/products/add')}>Add New Product</Button>
      </div>
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => navigate(`/admin/products/edit/${product._id}`)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => deleteProduct(product._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredProducts.length === 0 && (
        <div className="text-center mt-4">No products found.</div>
      )}
    </div>
  );
};

export default ManageProducts;