import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import Sidebar from '../components/Sidebar/Sidebar';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';
import { IProduct } from '../types/Constants';
import Pagination from '../components/Pagination/Pagination';
import { fetchProducts } from '../store/slices/productsSlice';

const ProductCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);
  const [activeCategory, setActiveCategory] = useState(category || 'الجميع');
  const [sortBy, setSortBy] = useState('ترتيب حسب');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    setActiveCategory(category || 'الجميع');
  }, [category]);

  const categories = useMemo(() => ['الجميع', 'اختيارات مودة', 'الأطفال', 'الألعاب', 'الأنشطة', 'الحلويات', 'البيت', 'السلاسات'], []);

  const filteredProducts = useMemo(() => {
    return activeCategory === 'الجميع'
      ? products
      : products.filter((product) => product.category === activeCategory);
  }, [products, activeCategory]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'السعر: من الأقل إلى الأعلى') {
        return Number(a.price) - Number(b.price);
      } else if (sortBy === 'السعر: من الأعلى إلى الأقل') {
        return Number(b.price) - Number(a.price);
      } else if (sortBy === 'أحدث المنتجات') {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
      return 0;
    });
  }, [filteredProducts, sortBy]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart(product));
  };

  const handleCategoryChange = (newCategory: string) => {
    setActiveCategory(newCategory);
    setCurrentPage(1);
    navigate(`/categories/${newCategory}`);
  };

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى.</div>;
  }

  return (
    <div className="font-sans" dir="rtl">
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb selectedPage={activeCategory} />
        <h1 className="text-3xl font-bold mb-4">{activeCategory} / {sortedProducts.length} المنتجات</h1>
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex space-x-4 space-x-reverse mb-4 md:mb-0 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${activeCategory === cat ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
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
          <Sidebar categories={categories} activeCategory={activeCategory} setActiveCategory={handleCategoryChange} />
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <Link to={`/products/${product.SKU}`} key={product.id} state={product}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
            {paginatedProducts.length === 0 && (
              <p className="text-center text-gray-500 mt-8">لا توجد منتجات متاحة في هذه الفئة.</p>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(sortedProducts.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductCategoryPage;