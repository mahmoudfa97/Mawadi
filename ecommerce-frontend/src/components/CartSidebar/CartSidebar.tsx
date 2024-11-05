import React, { useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { Minus, Plus } from "lucide-react";
import { decrementQuantity, incrementQuantity, removeFromCart, clearCart } from "../../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";
import { CartItem } from "../../types/Constants";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSideBar: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const totalPrice = cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  // Close sidebar if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>
      )}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-80 h-full bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold mb-4">حقيبة</h1>
          {cartItems.length === 0 ? (
            <p>سلة التسوق فارغة</p>
          ) : (
            <>
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow mb-4 flex items-center">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{Number(item.price).toFixed(2)} $</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => dispatch(decrementQuantity(item.id))} className="bg-gray-200 p-1 rounded-full">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="mx-2 text-lg">{item.quantity}</span>
                      <button onClick={() => dispatch(incrementQuantity(item.id))} className="bg-gray-200 p-1 rounded-full">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(`${item.id}`))} className="text-red-500 hover:text-red-700">
                    حذف
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
        <Link to={"/checkout"}>
          <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300">checkout</button>
        </Link>
        <div className="mt-4">
          <p className="font-bold">المجموع: {totalPrice} ر.س</p>
          <Button onClick={() => dispatch(clearCart())} className="mt-2 mr-2">
            إفراغ السلة
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartSideBar;
