import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <footer className="bg-gray-100 w-[96%] xl:w-[92%] mx-auto rounded-2xl md:rounded-[50px] lg:my-12 pb-16 md:pb-8 lg:pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-8 px-5 xl:px-12 py-8 pb-6 lg:pb-12 lg:py-12">
        {/* Logo Section */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="flex flex-col py-3 items-center cursor-pointer">
            <img src="/arabic-logo.png" alt="Logo" className="h-12" />
            <p className="text-sm text-right">وجهتك الأولى للهدايا الفريدة والمميزة</p>
          </div>
        </div>

        {/* Occasions Section */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer lg:cursor-default"
            onClick={() => toggleSection('occasions')}
          >
            <h5 className="font-bold text-[15px] sm:text-base xl:text-lg text-black">المناسبات</h5>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 lg:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSections['occasions'] ? 'max-h-96' : 'max-h-0'} lg:max-h-96`}>
            <ul className="flex flex-col gap-2 mt-4">
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">أحبك</Link></li>
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">تهانينا</Link></li>
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">خطبة</Link></li>
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">مولود جديد</Link></li>
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">يوم الميلاد</Link></li>
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">أم وعائلة</Link></li>
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">الذكرى السنوية</Link></li>
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">زواج</Link></li>
            </ul>
            <Link to="/occasions" className="text-xs lg:text-sm font-semibold capitalize pt-4 block hover:underline">
              عرض الكل
            </Link>
          </div>
        </div>

        {/* Categories Section */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer lg:cursor-default"
            onClick={() => toggleSection('categories')}
          >
            <h5 className="font-bold text-[15px] sm:text-base xl:text-lg text-black">الفئات</h5>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 lg:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSections['categories'] ? 'max-h-96' : 'max-h-0'} lg:max-h-96`}>
            <ul className="flex flex-col gap-2 mt-4">
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">الاكسسوارات</Link></li>
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">اختيارات مودة</Link></li>
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">البيت</Link></li>
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">زوارة</Link></li>
            </ul>
            <Link to="/categories" className="text-xs lg:text-sm font-semibold capitalize pt-4 block hover:underline">
              عرض الكل
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer lg:cursor-default"
            onClick={() => toggleSection('faq')}
          >
            <h5 className="font-bold text-[15px] sm:text-base xl:text-lg text-black">الأسئلة الشائعة</h5>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 lg:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSections['faq'] ? 'max-h-96' : 'max-h-0'} lg:max-h-96`}>
            <ul className="flex flex-col gap-2 mt-4">
              <li><Link to="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">كيف أستطيع أن أرى المناسبات؟</Link></li>
            </ul>
            <Link to="/faq" className="text-xs lg:text-sm font-semibold capitalize pt-4 block hover:underline">
              عرض الكل
            </Link>
          </div>
        </div>

        {/* Social Media and App Download Section */}
        <div className="col-span-1 py-6 mt-2 lg:mt-0 lg:py-0 border-y lg:border-0 border-gray-300 text-center lg:text-start">
          <h4 className="font-bold text-[15px] sm:text-base xl:text-lg pb-2 md:pb-4 text-black">لأية استفسارات</h4>
          <div className="flex justify-center lg:justify-start gap-4 mb-6">
            <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link to="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-tiktok"></i>
            </Link>
            <Link to="https://www.snapchat.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-snapchat"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Links for Both Mobile and Desktop */}
      <div className="px-5 xl:px-12 border-t border-gray-300 py-4">
        <ul className="flex flex-wrap gap-4 justify-center text-[10px] sm:text-[12px]">
          <li><Link to="/about-us" className="hover:underline">من نحن</Link></li>
          <li><Link to="/contact-us" className="hover:underline">اتصل بنا</Link></li>
          <li><Link to="/terms" className="hover:underline">الشروط والأحكام</Link></li>
          <li><Link to="/privacy" className="hover:underline">سياسة الخصوصية</Link></li>
          <li><Link to="/data-deletion" className="hover:underline">سياسة حذف البيانات</Link></li>
        </ul>
      </div>

      {/* Fixed Bottom Navigation on Mobile */}
      <nav className="fixed z-50 inset-x-0 bottom-0 lg:hidden bg-gray-100 rounded-t-2xl">
        <div className="px-3 py-3 flex justify-around items-center">
          <Link to="/" className="block">
            <img src="/placeholder.svg" alt="Home" className="w-6 h-6" />
          </Link>
          <Link to="/search" className="block">
            <img src="/placeholder.svg" alt="Search" className="w-6 h-6" />
          </Link>
          <Link to="/calendar" className="block">
            <img src="/placeholder.svg" alt="Calendar" className="w-6 h-6" />
          </Link>
          <Link to="/profile" className="block">
            <img src="/placeholder.svg" alt="Profile" className="w-6 h-6" />
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;