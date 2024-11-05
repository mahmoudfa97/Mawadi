import React, { useState } from 'react';

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
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">أحبك</a></li>
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">تهانينا</a></li>
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">خطبة</a></li>
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">مولود جديد</a></li>
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">يوم الميلاد</a></li>
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">أم وعائلة</a></li>
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">الذكرى السنوية</a></li>
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">زواج</a></li>
            </ul>
            <a href="/occasions" className="text-xs lg:text-sm font-semibold capitalize pt-4 block hover:underline">
              عرض الكل
            </a>
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
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">الاكسسوارات</a></li>
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">اختيارات مودة</a></li>
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">البيت</a></li>
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">زوارة</a></li>
            </ul>
            <a href="/categories" className="text-xs lg:text-sm font-semibold capitalize pt-4 block hover:underline">
              عرض الكل
            </a>
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
              <li><a href="/" className="text-[13px] sm:text-sm xl:text-base text-gray-800 hover:underline">كيف أستطيع أن أرى المناسبات؟</a></li>
            </ul>
            <a href="/faq" className="text-xs lg:text-sm font-semibold capitalize pt-4 block hover:underline">
              عرض الكل
            </a>
          </div>
        </div>

        {/* Social Media and App Download Section */}
        <div className="col-span-1 py-6 mt-2 lg:mt-0 lg:py-0 border-y lg:border-0 border-gray-300 text-center lg:text-start">
          <h4 className="font-bold text-[15px] sm:text-base xl:text-lg pb-2 md:pb-4 text-black">لأية استفسارات</h4>
          <div className="flex justify-center lg:justify-start gap-4 mb-6">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-tiktok"></i>
            </a>
            <a href="https://www.snapchat.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-snapchat"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Links for Both Mobile and Desktop */}
      <div className="px-5 xl:px-12 border-t border-gray-300 py-4">
        <ul className="flex flex-wrap gap-4 justify-center text-[10px] sm:text-[12px]">
          <li><a href="/about-us" className="hover:underline">من نحن</a></li>
          <li><a href="/contact-us" className="hover:underline">اتصل بنا</a></li>
          <li><a href="/terms" className="hover:underline">الشروط والأحكام</a></li>
          <li><a href="/privacy" className="hover:underline">سياسة الخصوصية</a></li>
          <li><a href="/data-deletion" className="hover:underline">سياسة حذف البيانات</a></li>
        </ul>
      </div>

      {/* Fixed Bottom Navigation on Mobile */}
      <nav className="fixed z-50 inset-x-0 bottom-0 lg:hidden bg-gray-100 rounded-t-2xl">
        <div className="px-3 py-3 flex justify-around items-center">
          <a href="/" className="block">
            <img src="/placeholder.svg" alt="Home" className="w-6 h-6" />
          </a>
          <a href="/search" className="block">
            <img src="/placeholder.svg" alt="Search" className="w-6 h-6" />
          </a>
          <a href="/calendar" className="block">
            <img src="/placeholder.svg" alt="Calendar" className="w-6 h-6" />
          </a>
          <a href="/profile" className="block">
            <img src="/placeholder.svg" alt="Profile" className="w-6 h-6" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;