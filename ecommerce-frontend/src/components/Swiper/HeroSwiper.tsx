// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "./Swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const HeroSwiper = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      className="relative z-10 w-full aspect-[3/2] rounded-2xl md:aspect-[unset md:h-[425px]w-full aspect-[3/2] rounded-2xl md:aspect-[unset md:h-[425px]" // Ensures it's below the cart
      onSwiper={(swiper: any) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className="slideImgContainer w-full h-full object-center rounded-2xl cursor-pointer">
          <img src="./1.jpeg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slideImgContainer w-full h-full object-center rounded-2xl cursor-pointer">
          <img src="./2.jpeg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slideImgContainer w-full h-full object-center rounded-2xl cursor-pointer">
          <img src="./3.jpeg" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slideImgContainer w-full h-full object-center rounded-2xl cursor-pointer">
          <img src="./4.jpeg" alt="" />
        </div>
      </SwiperSlide>
      ...
    </Swiper>
    
  );
};

export default HeroSwiper 
