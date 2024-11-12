import React from "react";
import {  Minus, Plus } from "lucide-react";
import { removeFromCart, incrementQuantity, decrementQuantity, updatePersonalization } from "../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";
import CartHeader from "./cart/header";
import { CartItem } from "../types/Constants";

const CartPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const handlePersonalizationChange = (itemId: string, videoFile?: File, customMessage?: string) => {
    dispatch(updatePersonalization({ isEnabled: true, itemId, videoFile, customMessage }));
  };
  const totalPrice = cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  const actions = ["تقسيمة الدفع", "رسالة تقدير", "إضافة بطاقة"];
  return (
    <div>
      <main className="flex-grow container mx-auto px-4 py-8">
        <CartHeader />
        <div className="grid grid-cols-1 visible-animation lg:grid-cols-5 xl:grid-cols-3 gap-6 sm:gap-10 ng-star-inserted">
          {/* Cart Items */}
          <div className="lg:col-span-3 xl:col-span-2 flex flex-col gap-5">
            {cartItems.length === 0 ? (
              <p>سلة التسوق فارغة</p>
            ) : (
              <>
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="w-full grid grid-cols-6 sm:grid-cols-8 xl:grid-cols-7 gap-4 sm:gap-5 border-b pb-4 sm:pb-5 border-[#E4E4E4] ng-star-inserted">
                    <div className="col-span-2 xl:col-span-1 flex justify-start items-center">
                      <img src={item.image} alt={item.image} className="product border aspect-square object-cover border-borderColor bg-[#F8F8F8] rounded-md" />
                    </div>

                    <div className="col-span-4 sm:col-span-6 gap-4 sm:gap-5 sm:gap-y-3 grid-cols-subgrid flex flex-col justify-between h-full">
                      <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
                        <div className="flex col-span-2 sm:col-span-1 justify-between gap-2 items-center">
                          <h2 className="text-lg font-semibold">{item.name}</h2>
                        </div>
                        <div className="flex justify-start sm:justify-end">
                          <div className="flex items-center mt-2 flex gap-1 w-fit">
                            <button onClick={() => dispatch(decrementQuantity(item.id))} className="bg-gray-200 p-1 rounded-full">
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="mx-2 text-lg">{item.quantity}</span> {/* Ensure this is correctly accessing the quantity */}
                            <button onClick={() => dispatch(incrementQuantity(item.id))} className="bg-gray-200 p-1 rounded-full">
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="">
                          <span className="text-xs sm:text-sm flex text-end justify-end sm:items-start sm:justify-start xl:text-end xl:justify-end font-customBold text-[#8A8A8A]">
                            {Number(item.price).toFixed(2)} $
                          </span>
                        </div>
                      </div>
                       <div className="flex justify-between gap-5 items-end">
                      <div className="flex flex-wrap gap-2 attribute items-center justify-start ng-star-inserted">
                        <Link to="" className="text-sm flex gap-2 items-center font-customMedium text-[#8A8A8A] after:content-['|'] after:text-sm after:font-customMedium after:text-[#8A8A8A] ng-star-inserted"></Link>
                      </div>
                      <button onClick={() => dispatch(removeFromCart(`${item.id}`))} className="w-3 sm:w-4 cursor-pointer">
                        حذف
                      </button>
                    </div>

                {/* Personalization section */}
                {item.personalization && (
                  <div className="personalization">
                    <h4>Personalization</h4>
                    {item.personalization && (
                      <div>
                        <label>Attach a video message:</label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) =>
                            handlePersonalizationChange(`${item.id}`, e.target.files?.[0], item.personalization.customMessage)
                          }
                        />
                        <label>Add a custom message:</label>
                        <textarea
                          value={item.personalization.customMessage}
                          onChange={(e) =>
                            handlePersonalizationChange(`${item.id}`, item.personalization.videoFile, e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
                    </div>

                   
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="flex flex-col lg:gap-5 lg:col-span-2 xl:col-span-1 h-fit bg-white w-full sticky top-4">
            <div className="grid py-4 lg:p-4 lg:box-shadow lg:border bg-white lg:border-[#E4E4E4] rounded-md grid-cols-4 gap-2">
              {actions.map((item, idx) => (
                <div className="bg-[#F8F8F8] flex rounded-md cursor-pointer justify-center items-center py-2.5 flex-col gap-2">
                  <img src="" className="w-5 lg:w-[22px]" alt="" />
                  <p className="text-[8px] md:text-[10px] lg:text-[9px] 2xl:text-[10px] font-customBold text-black text-center">{item}</p>
                </div>
              ))}
            </div>
            <div className="lg:shadow-lg lg:border bg-white lg:border-[#E4E4E4] box-shadow pb-4 lg:p-5 rounded-md">
              <div className="lg:shadow-lg lg:border bg-white lg:border-[#E4E4E4] box-shadow pb-4 lg:p-5 rounded-md">
                <>
                  <h2 className="font-customBold hidden lg:block text-lg sm:text-xl text-black capitalize pb-5">ملخص الطلب</h2>
                  <div className="flex flex-col gap-3 lg:gap-2 pb-4 lg:pb-5">
                    <div className="flex justify-between items-center bg-[#F8F8F8] rounded-md px-4 py-2.5 lg:px-0 lg:py-0 lg:bg-transparent"></div>
                    <span className="text-xs sm:text-base text-black font-customSemiBold capitalize">المجموع الفرعي</span>
                    <span className="text-black font-customBold text-xs sm:text-base">{totalPrice.toFixed(2)} شيكل</span>
                  </div>

                  <div className="">
                    <Link to="/checkout">
                      <button className="w-full bg-purple-700 text-white py-3 rounded-lg mt-4">متابعة الدفع</button>
                    </Link>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
