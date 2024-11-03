import React, { useEffect } from "react";
import HeroSwiper from "../components/Swiper/HeroSwiper";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { checkForUpdates, fetchProducts, getMostSoldProducts, getPopularItems, getRelatedProducts, getSpecialProducts, getWhatsNewProducts } from "../store/productsSlice";
import SwiperComponent from "../components/Slider/Slider";

const Home: React.FC = () => {
  const { products, whatsNewProducts, specialProducts, popularItems, loading, error  } = useAppSelector((state) => state.products);
  const { categories, occasions } = useAppSelector((state) => state.utils);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts()).then(() => {
      dispatch(getSpecialProducts());
      dispatch(getWhatsNewProducts());
      dispatch(getMostSoldProducts());
      dispatch(getPopularItems());
    });
  }, [dispatch]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getSpecialProducts());
      dispatch(getWhatsNewProducts());
      dispatch(getRelatedProducts(products[0]?.id));
    } else {
      const updateInterval = setInterval(() => {
        dispatch(checkForUpdates());
      }, 60000); // Check for updates every minute

      return () => clearInterval(updateInterval);
    }
  }, [dispatch, products.length]);

  return (
    <div className="font-sans" dir="rtl">
      <div className="w-full px-5 main-header xl:w-[92%] mx-auto pt-0 md:pt-5">
        <HeroSwiper />
      </div>
      <div className="2xl:px-40 lg:px-14 xl:px-20 px-5">
      <SwiperComponent items={occasions} title="المناسبات" linkBasePath="/occasions" type={"O"} />
      <SwiperComponent items={popularItems} title="الشائع" linkBasePath="/productlisting/الشائع" type={"P"} />
      <SwiperComponent items={categories} title="الفئات" linkBasePath="/categories" type={"C"} />
      <SwiperComponent items={whatsNewProducts} title="ما هو جديد؟" linkBasePath="/productlisting/ما هو جديد؟" type={"P"} />
      <SwiperComponent items={specialProducts} title="بطاقات مودة" linkBasePath="/productlisting/بطاقات مودة" type={"P"} />

      </div>
    </div>
  );
};

export default Home;
