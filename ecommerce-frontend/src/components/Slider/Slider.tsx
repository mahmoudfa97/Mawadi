import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryCard from "../CategoryCard/CategoryCard";
import OccasionCard from "../OccasionCard/OccasionCard";
import ProductCard from "../ProductCard/ProductCard";
import { IProduct, IOccasions, ICategories } from "../../types/Constants";

type Item = IProduct | IOccasions | ICategories;

interface SwiperComponentProps {
  items: Item[];
  title: string;
  linkBasePath: string;
  type: 'P' | 'C' | 'O';
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({ items, title, linkBasePath, type }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const checkArrows = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkArrows();
    window.addEventListener('resize', checkArrows);
    return () => window.removeEventListener('resize', checkArrows);
  }, []);


  const renderItem = (item: Item, index: number) => {
    switch (type) {
      case 'P':
        return <ProductCard key={index} product={item as IProduct} />;
      case 'C':
        return (
          <Link key={index} to={`${linkBasePath}/${(item as ICategories).name}`} state={item}>
            <CategoryCard iname={(item as ICategories).name} icon={(item as ICategories).icon} />
          </Link>
        );
      case 'O':
        return (
          <Link key={index} to={`productlisting/${(item as IOccasions).name}`} state={item}>
            <OccasionCard iname={(item as IOccasions).name} icon={(item as IOccasions).icon} />
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Link to={linkBasePath} className="text-gray-500 hover:text-gray-700">
            عرض الكل
          </Link>
        </div>
        <div className="relative">
          {showLeftArrow && (
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10" 
              onClick={() => scroll(-200)}
              aria-label="Previous items"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
          {showRightArrow && (
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10" 
              onClick={() => scroll(200)}
              aria-label="Next items"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div 
            ref={containerRef}
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
            onScroll={checkArrows}
          >
            {items.map((item, index) => (
              <div key={index} className="flex-shrink-0">
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperComponent;