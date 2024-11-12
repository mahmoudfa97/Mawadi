import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import { IProduct, IOccasions, ICategories } from "../../types/Constants";
import ProductCard from "../ProductCard/ProductCard";
import CategoryCard from "../CategoryCard/CategoryCard";
import OccasionCard from "../OccasionCard/OccasionCard";
// Assuming you have a cart state management solution, like Redux
// import { useAppDispatch } from "../store/hooks";
// import { addToCart } from "../store/slices/cartSlice";
import './slider.css'
type Item = IProduct | ICategories | IOccasions;

interface ProductListingProps {
  items: Item[];
  title: string;
  linkBasePath: string;
  type: "P" | "C" | "O";
}

const ProductListing: React.FC<ProductListingProps> = ({ items, title, linkBasePath, type }) => {
  // const dispatch = useAppDispatch();

  const renderItem = (item: Item, index: number) => {
    switch (type) {
      case "P":
        const product = item as IProduct;
        return <ProductCard product={product} />;
      case "C":
        const category = item as ICategories;
        return <CategoryCard key={index} iname={(item as ICategories).name} icon={(item as ICategories).icon} />;
      case "O":
        const occasion = item as IOccasions;
        return <OccasionCard key={index} iname={(item as IOccasions).name} icon={(item as IOccasions).icon} />;
      default:
        return null;
    }
  };
  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <div className="hidden z-10 lg:flex justify-between absolute top-[52%] left-[50%] w-full -translate-x-[50%] -translate-y-[50%]" onClick={onClick}>
        <button id="next3">
          <img src="/slider-arrow.svg" alt="Next" className="w-6 xl:w-8 2xl:w-10 absolute z-[101]  lg:end-0 xl:end-5 2xl:end-0 cursor-pointer" />
        </button>
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <div className="hidden z-10 lg:flex justify-between absolute top-[52%] left-[50%] w-full -translate-x-[50%] -translate-y-[50%]" onClick={onClick}>
        <button className="" id="previous3">
          <img src="/slider-arrow.svg" alt="Previous" className="w-6 xl:w-8 2xl:w-10 absolute z-[101] ltr:-scale-x-100 lg:start-0 xl:start-5 2xl:start-0 cursor-pointer" />
        </button>
      </div>
    );
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-myfont text-lg md:text-2xl lg:text-4xl text-black">{title}</h2>
          <Link to={linkBasePath} className="text-sm text-gray-500 hover:text-gray-700">
            View All
          </Link>
        </div>

        <Slider {...settings}>
          {items.map((item, index) => (
            <div key={index} className="flex overflow-x-auto overflow-y-auto scroll-smooth scrollbar-design gap-x-4 mt-2 md:mt-4">
              {renderItem(item, index)}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductListing;
