import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchProducts } from "../store/slices/productsSlice";
import ProductCard from "../components/ProductCard/ProductCard";
import { IProduct } from "../types/Constants";

const ProductCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);

  const [activeCategory, setActiveCategory] = useState(category || "الجميع");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    setActiveCategory(category || "الجميع");
  }, [category]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo(
    () => ["الجميع", "الاكسسوارات", "الشموع", "الحلويات", "الورود"],
    []
  );

  const additionalFiltersList = useMemo(
    () => ["الألوان", "الأحجام", "العلامات التجارية"],
    []
  );

  const toggleSection = (section: string) => {
    setOpenSection((prevSection) => (prevSection === section ? null : section));
  };

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

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
  
    let filtered = [...products]; // Create a shallow copy to avoid mutating the original array.
  
    // Filter by active category
    if (activeCategory !== "الجميع") {
      filtered = filtered.filter((product) => product.category === activeCategory);
    }
  
    // Apply selected filters with type safety
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter((product) => {
          const productValue = product[key as keyof IProduct];
  
          // Handle arrays (e.g., `occasion`, `tags`) or primitive values
          if (Array.isArray(productValue)) {
            return productValue.some((val) => values.includes(String(val)));
          } else if (typeof productValue === "string" || typeof productValue === "number") {
            return values.includes(String(productValue));
          }
  
          return false; // Skip if value is not filterable
        });
      }
    });
  
    return filtered;
  }, [products, activeCategory, selectedFilters]);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const renderAccordionSection = (title: string, items: string[], sectionKey: string) => (
    <div className="accordion-section">
      <div
        className="bg-[#F8F8F8] border-b border-[#E4E4E4] rounded cursor-pointer"
        onClick={() => toggleSection(sectionKey)}
      >
        <div className="flex justify-between px-4 py-3 items-center">
          <h2 className="text-base font-bold text-[#434343]">{title}</h2>
          <ChevronDown
            className={`w-4 transition-transform duration-300 ${
              openSection === sectionKey ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      <div
        className={`overflow-hidden transition-max-height duration-300 ${
          openSection === sectionKey ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <ul className="px-4 mt-3">
          {items.map((item, index) => (
            <li key={index} className="py-2 flex items-center gap-2">
              <input
                type="checkbox"
                id={`${sectionKey}-${item}`}
                checked={selectedFilters[sectionKey]?.includes(item) || false}
                onChange={() => handleCheckboxChange(sectionKey, item)}
              />
              <label htmlFor={`${sectionKey}-${item}`} className="text-sm font-bold text-[#434343]">
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;
  if (error) return <div className="text-center py-8 text-red-500">حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى.</div>;
  
  return (
    <section>
      <div>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <div>
        {renderAccordionSection("Categories", categories, "categories")}
        {renderAccordionSection("Filters", additionalFiltersList, "filters")}
      </div>
      <div>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductCategoryPage;
