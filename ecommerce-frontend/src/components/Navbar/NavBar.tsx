import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import LoginModal from '../../Modals/LoginModal';
import CartSideBar from '../CartSidebar/CartSidebar';

const Header: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isArabic, setIsArabic] = useState(true);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [openDropDown, setopenDropDown] = React.useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const categories = useAppSelector((state) => state.utils.categories)
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };
    // Toggle search visibility
    const toggleSearch = () => {
      setIsSearchVisible(!isSearchVisible);
    };
    const handleClickOpen = () => {
      if(user.isLoggedIn){
        navigate('/myprofile')
      }else{
        setOpenLoginModal(true);
      }
    };
  
    const handleClose = () => {
      setOpenLoginModal(false);
    };

  // Toggle language between Arabic and English
  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };
const handleDropDOwn = () => {
  setHoveredCategory('فئات')
  setopenDropDown(true)
}
  return (
    <div className="py-5 z-50">
    <header className="w-[96%] main-header xl:w-[92%] duration-100 ease-in-out top-0 bg-white relative z-50 mx-auto rounded-full shadow-md ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative" onClick={toggleCart}>
            <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
          <svg onClick={handleClickOpen} className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>

          <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition language-toggle" onClick={toggleLanguage}>
            {isArabic ? 'Eng' : 'عربى'}
          </button>
          <svg onClick={toggleSearch} className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {isSearchVisible && (
          <div className="search-bar">
            <input type="text" placeholder={isArabic ? 'ابحث...' : 'Search...'} className="search-input" />
          </div>
        )}

<nav className="hidden md:flex space-x-6 ">
          <Link to="/" className="text-gray-700 hover:text-gray-900 transition">  {isArabic ? 'بيت' : 'Home'}</Link>
          <Link to="/bestsellers" className="text-gray-700 hover:text-gray-900 transition">  {isArabic ? 'الأكثر مبيعا' : 'Best seller'}</Link>
          <Link to="/categories" className="text-gray-700 hover:text-gray-900 transition"    onMouseEnter={() => handleDropDOwn()}
                onMouseLeave={() => setHoveredCategory(null)}>  {isArabic ? 'فئات' : 'Categories'}</Link>
          <Link to="/occasions" className="text-gray-700 hover:text-gray-900 transition"    onMouseEnter={() => setHoveredCategory('مناسبات')}
                onMouseLeave={() => setHoveredCategory(null)}>  {isArabic ? 'مناسبات' : 'Occasions'}</Link>
          <Link to="/mawadda-tree" className="text-gray-700 hover:text-gray-900 transition"> {isArabic ? 'سحر مودة ' : 'Mawadi-Magic'}</Link>
        </nav>
  
        <div className="flex-end text-center">
          <img className="mx-auto" width="80px" height="80px" src="/arabic-logo.png" alt="Logo" />
        </div>
      </div>
    </header>
    <LoginModal isOpen={openLoginModal} closeModal={handleClose} />
    <CartSideBar isOpen={isCartOpen} onClose={toggleCart} />
  </div>
  
  );
};

export default Header;
