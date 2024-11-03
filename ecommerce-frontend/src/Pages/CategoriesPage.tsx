import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import { useAppSelector } from '../store/hooks';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
const CategoriesPage: React.FC = () => {
    const categories = useAppSelector((state) => state.utils.categories)

  return (
      <div className="font-sans" dir="rtl">
         <main className="container mx-auto px-4 py-8">
        <Breadcrumb selectedPage={'فئات'} />
        <h1 className="text-4xl font-bold mb-8 text-center">فئات</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} iname={category.name} icon={category.icon} />
          ))}
        </div>
      </main>
      </div> 
  );
};


export default CategoriesPage;
