import React from "react";
import { useAppSelector } from "../../store/hooks";

const CartHeader: React.FC = () => {
    const cartItems = useAppSelector((state: { cart: { items: any; }; }) => state.cart.items);

  return (
    <div className="hidden md:flex justify-start items-baseline border-b border-[#E4E4E4] gap-1 pb-3 sm:pb-5 mb-10 ng-star-inserted">
      <h1 className="text-start text-black text-2xl sm:text-3xl lg:text-4xl font-customBold capitalize">حقيبة</h1>
      <span className="text-[#8A8A8A] text-sm font-customMedium">   {cartItems.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0)} \ منتج</span>
    </div>
  );
};

export default CartHeader;
