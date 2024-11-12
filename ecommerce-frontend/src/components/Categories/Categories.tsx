import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";

const Categories = () => {
  const { categories } = useAppSelector((state) => state.utils);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 5; // Number of categories visible at a time

  const handleNext = () => {
    if (currentIndex < categories.length - visibleCount) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">الفئات</h2>
          <Link to="/categories" className="text-gray-500 hover:text-gray-700">
            عرض الكل
          </Link>
        </div>
        <div className="hidden lg:flex justify-between absolute top-1/2 left-0 right-0 -mt-4">
          <button
            className="bg-white rounded-full p-2 shadow-md"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <button
            className="bg-white rounded-full p-2 shadow-md"
            onClick={handleNext}
            disabled={currentIndex >= categories.length - visibleCount}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {categories.slice(currentIndex, currentIndex + visibleCount).map((category, index) => (
            <Link key={index} to={`/productlisting/${category.name}`}>
              <CategoryCard iname={category.name} icon={category.icon} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
