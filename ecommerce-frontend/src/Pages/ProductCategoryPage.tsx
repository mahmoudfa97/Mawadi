import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronDown, Plus, Minus, X, Filter } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";
import { fetchProducts } from "../store/slices/productsSlice";
import { IProduct, IOccasions, ICategories } from "../types/Constants";
import ProductCard from "../components/ProductCard/ProductCard";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/UI/select";
import { Button } from "../components/UI/button";
import { Checkbox } from "../components/UI/checkbox";

const ProductCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);
  const [activeCategory, setActiveCategory] = useState(category || "الجميع");
  const [sortBy, setSortBy] = useState("ترتيب حسب");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [expandedSections, setExpandedSections] = useState<string[]>(['categories'])

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

  const handleCheckboxChange = (filterKey: string, value: string) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (!updatedFilters[filterKey]) {
        updatedFilters[filterKey] = [];
      }
      if (updatedFilters[filterKey].includes(value)) {
        updatedFilters[filterKey] = updatedFilters[filterKey].filter((item) => item !== value);
      } else {
        updatedFilters[filterKey].push(value);
      }
      return updatedFilters;
    });
  };

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

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

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
            <img src="filter-img.svg" alt="" className="size-4" />
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
          <Breadcrumb selectedPage={activeCategory} />
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
      {/* Mobile Header */}
      <div className="flex justify-between items-center lg:hidden mb-4">
        <h1 className="text-xl font-semibold">الأكثر مبيعاً / 20 المنتجات</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Category Navigation */}
      <div className="overflow-x-auto mb-6">
        <div className="flex space-x-2 rtl:space-x-reverse">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="whitespace-nowrap"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <aside className={`
          fixed inset-y-0 right-0 w-80 bg-white shadow-lg lg:shadow-none
          transform transition-transform duration-200 ease-in-out
          lg:relative lg:transform-none lg:w-auto
          ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          z-40 lg:z-0
        `}>
          {/* Mobile Filter Header */}
          <div className="lg:hidden flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold">الفلترة والترتيب</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-6">
            {/* Sort Section */}
            <div>
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('sort')}
              >
                <h3 className="font-semibold">ترتيب حسب</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              {expandedSections.includes('sort') && (
                <div className="mt-2 space-y-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الترتيب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">الأحدث</SelectItem>
                      <SelectItem value="price-asc">السعر: من الأقل إلى الأعلى</SelectItem>
                      <SelectItem value="price-desc">السعر: من الأعلى إلى الأقل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Categories Section */}
            <div>
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('categories')}
              >
                <h3 className="font-semibold">الأقسام</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              {expandedSections.includes('categories') && (
                <div className="mt-2 space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        checked={activeFilters.includes(category)}
                        onCheckedChange={() => toggleFilter(category)}
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Age Groups Section */}
            <div>
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('ageGroups')}
              >
                <h3 className="font-semibold">الفئات العمرية</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              {expandedSections.includes('ageGroups') && (
                <div className="mt-2 space-y-2">
                  {['0-2 سنوات', '3-5 سنوات', '6-8 سنوات', '9-11 سنوات'].map((age) => (
                    <label key={age} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        checked={activeFilters.includes(age)}
                        onCheckedChange={() => toggleFilter(age)}
                      />
                      <span className="text-sm">{age}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Gender Section */}
            <div>
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('gender')}
              >
                <h3 className="font-semibold">الجنس</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              {expandedSections.includes('gender') && (
                <div className="mt-2 space-y-2">
                  {['رجال', 'نساء', 'أطفال'].map((gender) => (
                    <label key={gender} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        checked={activeFilters.includes(gender)}
                        onCheckedChange={() => toggleFilter(gender)}
                      />
                      <span className="text-sm">{gender}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Brands Section */}
            <div>
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('brands')}
              >
                <h3 className="font-semibold">العلامات التجارية</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              {expandedSections.includes('brands') && (
                <div className="mt-2 space-y-2">
                  {['Brand 1', 'Brand 2', 'Brand 3'].map((brand) => (
                    <label key={brand} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        checked={activeFilters.includes(brand)}
                        onCheckedChange={() => toggleFilter(brand)}
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedProducts.map((product,idx) => (
                <ProductCard key={idx} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default ProductCategoryPage;