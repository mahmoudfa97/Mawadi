import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import CategoryCard from "../CategoryCard/CategoryCard";
import OccasionCard from "../OccasionCard/OccasionCard";
import ProductCard from "../ProductCard/ProductCard";
import { IProduct, IOccasions, ICategories } from "../../types/Constants";

interface SwiperComponentProps {
  items: IProduct[] | IOccasions[] | ICategories[];
  title: string;
  linkBasePath: string;
  type: string;
}
const SwiperComponent = (props: SwiperComponentProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 5; // Number of items visible at a time

  const handleNext = () => {
    if (currentIndex < props.items.length - visibleCount) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">{props.title}</h2>
          <a href={`${props.linkBasePath}`} className="text-gray-500 hover:text-gray-700">
            عرض الكل
          </a>
        </div>
        <div className="hidden lg:flex justify-between absolute top-1/2 left-0 right-0 -mt-4">
          <button className="bg-white rounded-full p-2 shadow-md" onClick={handlePrev} disabled={currentIndex === 0}>
            <ChevronRight className="w-6 h-6" />
          </button>
          <button className="bg-white rounded-full p-2 shadow-md" onClick={handleNext} disabled={currentIndex >= props.items.length - visibleCount}>
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div {...swipeHandlers} className="flex overflow-x-auto gap-4 pb-4">
          {props.items.slice(currentIndex, currentIndex + visibleCount).map((item: any, index: number) => (
            props.type === "P" ? (
                <ProductCard key={index} product={item} />
              ) :
            <Link key={index} to={`${props.type === "O"? 'productlisting' :props.linkBasePath}/${item.name}`} state={item}>
              {props.type === "C" ? (
                <CategoryCard key={index} iname={item.name} icon={item.icon} />
              ) : props.type === "O" ? (
                <OccasionCard key={index} iname={item.name} icon={item.icon} />
              ) : (
                ""
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwiperComponent;
