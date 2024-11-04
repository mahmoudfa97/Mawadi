import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import Sidebar from '../components/Sidebar/Sidebar';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { useAppSelector } from '../store/hooks';
import { CartItem, IProduct } from '../types/Constants';
const ProductCategoryPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('الجميع');
  const [sortBy, setSortBy] = useState('ترتيب حسب');
  const { products } = useAppSelector((state) => state.products);
  const location = useLocation();


  const addToCart = (product: IProduct) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const filteredProducts = activeCategory === 'الجميع'
    ? products
    : products.filter((product) => product.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'السعر: من الأقل إلى الأعلى') {
      return Number(a.price) - Number(b.price);
    } else if (sortBy === 'السعر: من الأعلى إلى الأقل') {
      return Number(b.price) - Number(a.price);
    }
    return 0;
  });

  const categories = ['الجميع', 'اختيارات مودة', 'الأطفال', 'الألعاب', 'الأنشطة', 'الحلويات', 'البيت', 'السلاسات'];

  return (
      <div className="font-sans" dir="rtl">
         <main className="container mx-auto px-4 py-8">
         <Breadcrumb selectedPage={activeCategory} />
        <h1 className="text-3xl font-bold mb-4">{activeCategory}  / {sortedProducts.length} المنتجات</h1>
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex space-x-4 space-x-reverse mb-4 md:mb-0 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${activeCategory === category ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <select
            className="bg-white border border-gray-300 rounded-md px-4 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>ترتيب حسب</option>
            <option>السعر: من الأقل إلى الأعلى</option>
            <option>السعر: من الأعلى إلى الأقل</option>
            <option>أحدث المنتجات</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row">
          <Sidebar categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <Link to={`/products/:${product.SKU}`} key={product.id} state={product}>
                <ProductCard key={product.id} product={product}/>
                </Link>
              ))}
            </div>
            {sortedProducts.length === 0 && (
              <p className="text-center text-gray-500 mt-8">لا توجد منتجات متاحة في هذه الفئة.</p>
            )}
            <div className="mt-8 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="/" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="/" aria-current="page" className="z-10 bg-purple-50 border-purple-500 text-purple-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </a>
                <a href="/" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  2
                </a>
                <a href="/" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a href="/" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                  8
                </a>
                <a href="/" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  9
                </a>
                <a href="/" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  10
                </a>
                <a href="/" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </main>
      </div>
  );
};


export default ProductCategoryPage;
