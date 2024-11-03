import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Star, ShoppingCart, Badge } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import ProductCard from '../components/ProductCard/ProductCard';
import { IProduct } from '../components/Constants/Constants';
import { getRelatedProducts } from '../store/productsSlice';
import { Button, Card, CardContent } from '@mui/material';
import Accordion from '../components/Accordion/Accordion';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

const ProductDetailsPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const product = location.state;
  const [selectedImage, setSelectedImage] = useState(`${product.image}`);
  const { relatedProducts , loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
      dispatch(getRelatedProducts(product));
  }, [dispatch]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="font-sans" dir="rtl">
      <main className="container mx-auto px-4 py-8">
      <Breadcrumb selectedPage={product.name} />

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src={`/${selectedImage}`} alt={product.name} className="w-full h-80 object-cover rounded-lg shadow-lg" />
            <div className="mt-4 flex space-x-2">
              {product.additionalImages?.map((img: any, index: any) => (
                <img
                  key={index}
                  src={`/${img}`}
                  alt={`${product.name} ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.brand}</h1>
            <h2 className="text-2xl mb-4 text-gray-800">{product.name}</h2>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < 3 ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="mr-2 text-gray-600">({product.salesCount} مبيعات)</span>
            </div>
            <p className="text-2xl font-bold mb-4">{`${product.price} ${product.currency}`}</p>
            <p className="text-gray-600 mb-2">وقت التحضير: {product.deliveryTime}</p>
            <p className="text-gray-600 mb-4">تاريخ وقت التسليم: {product.estimatedDeliveryDate}</p>

            <Button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300">
              <ShoppingCart className="mr-2 h-4 w-4" /> أضف إلى الحقيبة
            </Button>

            <div className="mt-6">
              <Accordion title="المناسبات">
                <div className="flex flex-wrap gap-2">
                  {product.occasion?.map((occ: any, index: number) => (
                    <Badge key={index} className="bg-purple-200 text-purple-800">{occ}</Badge>
                  ))}
                </div>
              </Accordion>

              {product.personalization && (
                <Accordion title="التخصيص">
                  <p className="text-gray-600">هذا المنتج قابل للتخصيص</p>
                </Accordion>
              )}

              <Accordion title="الميزات">
                <ul className="list-disc list-inside text-gray-600">
                  {product.features?.map((feature: any, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </Accordion>

              <Accordion title="الوصف">
                <p className="text-gray-600">{product.description}</p>
              </Accordion>

              <Accordion title="العلامات">
                <div className="flex flex-wrap gap-2">
                  {product.tags?.map((tag: any, index: number) => (
                    <Badge key={index} className="bg-purple-200 text-purple-800">{tag}</Badge>
                  ))}
                </div>
              </Accordion>

              <p className="mt-4 text-gray-500">رمز المنتج التعريفي: {product.productCode}</p>
              <p className="text-gray-500">SKU: {product.SKU}</p>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">ما يشتريه الناس عادةً</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {relatedProducts.map((relatedProduct: any, index: any) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img src="/placeholder.svg" alt={relatedProduct.name} className="w-full h-48 object-cover rounded-md mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{relatedProduct.name}</h3>
                  <p className="text-gray-600">{`${relatedProduct.price} ${product.currency}`}</p>
                </CardContent>
              </Card>))
              }
              {product.peopleAlsoBuy?.map((relatedProduct: any, index: any) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img src="/placeholder.svg" alt={relatedProduct.name} className="w-full h-48 object-cover rounded-md mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{relatedProduct.name}</h3>
                  <p className="text-gray-600">{`${relatedProduct.price} ${product.currency}`}</p>
                </CardContent>
              </Card>
            ))
            
            }
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetailsPage;
