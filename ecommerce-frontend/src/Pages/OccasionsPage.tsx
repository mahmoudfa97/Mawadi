import React from 'react';
import { Link } from 'react-router-dom';
import OccasionCard from '../components/OccasionCard/OccasionCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
const OccasionsPage: React.FC = () => {
  const occasions = useAppSelector((state) => state.utils.occasions)

  return (
      <div className="font-sans" dir="rtl">
         <main className="container mx-auto px-4 py-8">
         <Breadcrumb selectedPage={'مناسبات'} />
        <h1 className="text-4xl font-bold mb-8 text-center">مناسبات</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {occasions.map((occasion, index) => (
            <Link to={`/productlisting/:${occasion.name}`} state={occasion}>
              <OccasionCard key={index} iname={occasion.name} icon={occasion.icon} />
            </Link>
          ))}
        </div>
      </main> 
      </div>
  );
};


export default OccasionsPage;
