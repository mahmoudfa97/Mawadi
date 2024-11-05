import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Accordion from '../components/Accordion/Accordion';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { getRelatedProducts } from '../store/slices/productsSlice';
import { IProduct } from '../types/Constants';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetailsPage: React.FC = () => {
  const { SKU } = useParams<{ SKU: string }>();
  const dispatch = useAppDispatch();
  const location = useLocation(); 
  const { products, relatedProducts } = useAppSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState('');

  const currentProduct = location.state

  useEffect(() => {
    if (currentProduct) {
      setSelectedImage(currentProduct.image);
      dispatch(getRelatedProducts(currentProduct.id));
    }
  }, [dispatch, currentProduct]);

  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart(currentProduct));
    }
  };

  if (!currentProduct) return <div className="text-center py-8">لم يتم العثور على المنتج</div>;

  return (
    <div className="font-sans" dir="rtl">
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb selectedPage={currentProduct.name} />

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src={selectedImage} alt={currentProduct.name} className="w-full h-80 object-cover rounded-lg shadow-lg" />
            <div className="mt-4 flex space-x-2 space-x-reverse">
              {currentProduct.additionalImages?.map((img:any, index:any) => (
                <img
                  key={index}
                  src={img}
                  alt={`${currentProduct.name} ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{currentProduct.brand}</h1>
            <h2 className="text-2xl mb-4 text-gray-800">{currentProduct.name}</h2>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < currentProduct.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="mr-2 text-gray-600">({currentProduct.salesCount} مبيعات)</span>
            </div>
            <p className="text-2xl font-bold mb-4">{`${currentProduct.price} ${currentProduct.currency}`}</p>
            <p className="text-gray-600 mb-2">وقت التحضير: {currentProduct.deliveryTime}</p>
            <p className="text-gray-600 mb-4">تاريخ وقت التسليم: {currentProduct.estimatedDeliveryDate}</p>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 flex items-center justify-center"
            >
              <ShoppingCart className="ml-2 h-4 w-4" /> أضف إلى الحقيبة
            </button>

            <div className="mt-6">
              <Accordion title="المناسبات">
                <div className="flex flex-wrap gap-2">
                  {currentProduct.occasion?.map((occ:any, index:any) => (
                    <span key={index} className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-sm">{occ}</span>
                  ))}
                </div>
              </Accordion>

              {currentProduct.personalization && (
                <Accordion title="التخصيص">
                  <p className="text-gray-600">هذا المنتج قابل للتخصيص</p>
                </Accordion>
              )}

              <Accordion title="الميزات">
                <ul className="list-disc list-inside text-gray-600">
                  {currentProduct.features?.map((feature:any, index:any) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </Accordion>

              <Accordion title="الوصف">
                <p className="text-gray-600">{currentProduct.description}</p>
              </Accordion>

              <Accordion title="العلامات">
                <div className="flex flex-wrap gap-2">
                  {currentProduct.tags?.map((tag:any, index:any) => (
                    <span key={index} className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-sm">{tag}</span>
                  ))}
                </div>
              </Accordion>

              <p className="mt-4 text-gray-500">رمز المنتج التعريفي: {currentProduct.productCode}</p>
              <p className="text-gray-500">SKU: {currentProduct.SKU}</p>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">ما يشتريه الناس عادةً</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {relatedProducts.map((relatedProduct: IProduct) => (
              <Link to={`/products/${relatedProduct.SKU}`} state={relatedProduct} key={relatedProduct.id} className="block">
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{relatedProduct.name}</h3>
                    <p className="text-gray-600">{`${relatedProduct.price} ${relatedProduct.currency}`}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetailsPage;