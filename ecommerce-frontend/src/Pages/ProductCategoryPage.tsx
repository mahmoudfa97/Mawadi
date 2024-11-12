import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";
import { fetchProducts } from "../store/slices/productsSlice";
import { IProduct, IOccasions, ICategories } from "../types/Constants";
import ProductCard from "../components/ProductCard/ProductCard";

const ProductCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);
  const [activeCategory, setActiveCategory] = useState(category || "الجميع");
  const [sortBy, setSortBy] = useState("ترتيب حسب");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setActiveCategory(category || "الجميع");
  }, [category]);

  const categories = useMemo(() => [
    "الجميع", "D.A.I", "الاكسسوارات", "البخور", "البوكيهات", "البيت", "الحلويات", "الستاندات",
    "السلاسل", "الشموع", "الشوكولاتة", "الصحة والجمال", "الصحة و اللياقة", "العلب و الصواني",
    "الكيك", "المباخر", "المزهريات", "الورود", "زوارة", "كل الاكسسوارات", "كل الورود",
    "كل منتجات الزوارة", "كل منتجات المنزل", "مجموعة هدايا", "موزعات العطور", "هدايا مناسبة"
  ], []);

  const filteredProducts = useMemo(() => {
    return activeCategory === "الجميع" ? products : products.filter((product) => product.category === activeCategory);
  }, [products, activeCategory]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "السعر: من الأقل إلى الأعلى") {
        return Number(a.price) - Number(b.price);
      } else if (sortBy === "السعر: من الأعلى إلى الأقل") {
        return Number(b.price) - Number(a.price);
      } else if (sortBy === "أحدث المنتجات") {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
      return 0;
    });
  }, [filteredProducts, sortBy]);
  const handleAddToCart = (product: IProduct) => {
   // dispatch(addToCart(product));
  };
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const handleCategoryChange = (newCategory: string) => {
    setActiveCategory(newCategory);
    setCurrentPage(1);
    navigate(`/productlisting/${newCategory}`);
  };

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى.</div>;
  }

  return (
    <section className="duration-1000 ease-in-out">
      <div className="px-5 sticky lg:hidden duration-700 ease-in-out top-0 z-[11] bg-white translate-y-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 pt-2 py-4 md:py-8">
            <h2 className="font-fontMawada flex-1 text-lg md:text-2xl lg:text-4xl text-black">{activeCategory}</h2>
            <p className="font-customBold font-medium text-black text-xs text-wrap-name md:text-sm lg:text-base">/</p>
            <p className="text-black font-medium text-xs md:text-sm lg:text-base min-w-fit"> {sortedProducts.length} المنتجات</p>
          </div>
          <div className="bg-[#F8F8F8] rounded-md duration-500 min-w-[2rem] aspect-square ease-in-out flex lg:hidden justify-between shadow-xl box-shadow items-center gap-4 p-2 cursor-pointer">
            <img src="/assets/images/filter-img.svg" alt="" className="size-4" />
          </div>
        </div>
        <div className="overflow-auto scroll-new-style w-full mb-3">
          <div className="flex w-full flex-nowrap gap-2 md:gap-4 items-center pb-2">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`bg-[#F3FDFF] rounded-xl py-1 md:py-2 px-4 md:px-5 border whitespace-nowrap text-sm font-customBold cursor-pointer ${
                  activeCategory === cat ? "bg-[#F8F8F8] text-[#00353F]" : ""
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-6 hidden lg:block">
        <div className="hidden lg:block sm:w-[96%] xl:w-[92%] mx-auto px-4 md:px-10 py-2 bg-[#F8F8F8]">
          <ul className="flex gap-2 items-center">
            <li><Link to="/ar/home" className="text-xs text-black capitalize font-customLight text-wrap-name">بيت</Link></li>
            <li><span className="text-black text-xs font-customLight text-wrap-name">/</span></li>
            <li><span className="text-black text-xs text-wrap-name capitalize font-customBold">{activeCategory}</span></li>
          </ul>
        </div>
      </div>
      <div className="2xl:px-40 lg:px-14 xl:px-20 px-5 pb-5 lg:pb-12 lg:py-12">
        <div className="hidden lg:flex items-center gap-2 pb-3 md:pb-8">
          <h2 className="font-customBold text-black text-lg md:text-xl text-wrap-name lg:text-4xl capitalize">{activeCategory}</h2>
          <p className="font-customBold font-medium text-black text-xs text-wrap-name md:text-sm lg:text-base">/</p>
          <p className="text-black font-medium text-xs md:text-sm lg:text-base min-w-fit"> {sortedProducts.length} المنتجات</p>
        </div>
        <div className="flex lg:grid gap-8 lg:grid-cols-4 xl:grid-cols-5">
        <div className="w-full lg:col-span-3 xl:col-span-4">
            <div className="overflow-auto hidden lg:block scroll-style w-full mb-5">
              <div className="flex w-full flex-nowrap gap-3 md:gap-4 items-center pb-2">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className={`bg-[#F3FDFF] rounded-xl py-1 md:py-2 px-4 md:px-5 border whitespace-nowrap text-sm font-customBold cursor-pointer ${
                      activeCategory === cat ? "bg-[#F8F8F8] text-[#00353F]" : ""
                    }`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginatedProducts.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          </div>
          <div className="w-full ease-in-out duration-500 fixed bottom-0 start-0 h-full bg-white z-[2000] overflow-y-auto lg:overflow-hidden p-4 lg:h-[unset] lg:p-[unset] lg:z-[unset] lg:bg-[unset] lg:static ltr:translate-y-full rtl:translate-y-full lg:ltr:translate-y-0 lg:rtl:translate-y-0">
            <div className="flex flex-col gap-5 lg:gap-0">
              <div className="flex justify-between border-b border-[#F6F6F6] items-center pb-4 gap-4 w-full lg:hidden">
                <span className="text-xl font-customBold text-black">تصفية وفرز</span>
                <img src="/assets/icon/close.svg" alt="" className="size-4" />
              </div>
              <div className="pb-5 border-b border-[#E4E4E4]">
                <div className="bg-[#F8F8F8] rounded-2xl cursor-pointer">
                  <div className="flex py-3 px-4 justify-between gap-2 items-center">
                    <h2 className="text-base font-customBold text-[#434343]">ترتيب حسب</h2>
                    <p className="cursor-pointer">
                      <ChevronDown className="w-3 transition ease-out duration-700" />
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#F8F8F8] lg:bg-white lg:border-b border-[#E4E4E4] rounded-2xl lg:rounded-none cursor-pointer">
                  <div className="flex justify-between px-4 py-3 gap-2 items-center">
                    <h2 className="text-base font-customBold text-[#434343]">الأقسام</h2>
                    <span className="cursor-pointer">
                      <ChevronDown className="w-3 transition ease-out duration-700" />
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#F8F8F8] lg:bg-white lg:border-b border-[#E4E4E4] rounded-2xl lg:rounded-none cursor-pointer">
                  <div className="flex justify-between px-4 py-3 gap-2 items-center">
                    <h2 className="text-base font-customBold text-[#434343]">مناسبات</h2>
                    <span className="cursor-pointer">
                      <ChevronDown className="w-3 transition ease-out duration-700" />
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#F8F8F8] lg:bg-white lg:border-b border-[#E4E4E4] rounded-2xl lg:rounded-none cursor-pointer">
                  <div className="flex justify-between px-4 py-3 gap-2 items-center">
                    <h2 className="text-base font-customBold text-[#434343]">الفئات العمرية</h2>
                    <span className="cursor-pointer">
                      <ChevronDown className="w-3 transition ease-out duration-700" />
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#F8F8F8] lg:bg-white lg:border-b border-[#E4E4E4] rounded-2xl lg:rounded-none cursor-pointer">
                  <div className="flex justify-between px-4 py-3 gap-2 items-center">
                    <h2 className="text-base font-customBold text-[#434343]">الجنس</h2>
                    <span className="cursor-pointer">
                      <ChevronDown className="w-3 transition ease-out duration-700" />
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#F8F8F8] lg:bg-white lg:border-b border-[#E4E4E4] rounded-2xl lg:rounded-none cursor-pointer">
                  <div className="flex justify-between px-4 py-3 gap-2 items-center">
                    <h2 className="text-base font-customBold text-[#434343]">العلامات التجارية</h2>
                    <span className="cursor-pointer">
                      <ChevronDown className="w-3 transition ease-out duration-700" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
         
           
          </div>
       
        </div>
      </div>
    </section>
  );
};

export default ProductCategoryPage;