import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { addToCart, incrementQuantity, decrementQuantity } from "../../store/slices/cartSlice";
import { Minus, Plus } from "lucide-react";
import { IProduct } from "../../types/Constants";
import './ProductCard.css'
interface ProductCardProps {
  product: IProduct;
  linkBasePath?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [showQuantityInputs, setShowQuantityInputs] = useState<{ [key: number]: boolean }>({});

  const incrementQuantities = (id: number) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
    dispatch(incrementQuantity(id));

  };

  const decrementQuantities = (id: number) => {
    if(quantities[id] === 1){
      setShowQuantityInputs(prev => ({ ...prev, [product.id]: false }))
    }
    setQuantities(prev => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }));
    dispatch(decrementQuantity(id));

  };

  const handleAddToCart = (product: IProduct) => {
     dispatch(addToCart({ item: { ...product, quantity: quantities[product.id] || 1 }, quantity: quantities[product.id] || 1 }));
    setShowQuantityInputs(prev => ({ ...prev, [product.id]: true }));
    // add a toast notification here
  };

  return (
    <div key={product.id} className="flex mx-auto px-4 py-8">
    <div className="relative group">
      <div className="cursor-pointer">
        <div className="product-card aspect-square hover:zoom-animation">
          <Link to={`/products/${product.name}`} state={product}>
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square object-cover w-full rounded-md"
            />
          </Link>
        </div>
        <p className="text-black font-customSemiBold text-[13px] md:text-sm lg:text-base name mt-2 text-wrap-name">
          {product.name}
        </p>
        <div className="flex flex-wrap gap-1 items-center">
          <p className="text-themeColor font-customSemiBold text-[13px] price sm:text-sm lg:text-base mt-1">
            {product.price.toFixed(2)} {product.currency}
          </p>
        </div>
      </div>

      {product.inStock ? (
        <div className="hidden lg:flex lg:absolute lg:bottom-16 quantity-button-div w-full pt-2 lg:p-4 lg:group-hover:opacity-100 lg:opacity-0 hover-div lg:group-hover:translate-y-0 lg:translate-y-3 duration-700 ease-in-out">
          <div className="w-full">
            {showQuantityInputs[product.id] ? (
              <div className="flex justify-between items-center gap-1 w-full duration-700 ease-in-out transition-all">
                <button
                  onClick={() => decrementQuantities(product.id)}
                  className="themeButton button-style bg-[#F8F8F8] border-0 h-7 aspect-square sm:h-8 w-7 sm:w-[2.5rem] flex justify-center items-center p-0"
                >
                  <Minus className="size-[10px] md:size-4 duration-500 ease-in-out" />
                </button>
                <div className="border-none quantity-text text-base flex justify-center items-center p-1 h-7 sm:h-8 button-style aspect-square md:min-w-[2.5rem] text-center font-bold cursor-pointer rounded-md text-black bg-[#F8F8F8]">
                  <span className="pb-[0.5px]">{quantities[product.id] || 1}</span>
                </div>
                <button
                  onClick={() => incrementQuantities(product.id)}
                  className="themeButton button-style duration-500 bg-[#F8F8F8] border-0 h-7 w-7 aspect-square sm:h-8 sm:w-[2.5rem] flex justify-center items-center p-0"
                >
                  <Plus className="size-[10px] md:size-4 duration-500 ease-in-out" />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center gap-1 w-full duration-700 ease-in-out transition-all opacity-100">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="themeButton button-style main-plus-button duration-500 bg-[#F8F8F8] border-0 h-7 sm:h-8 w-full flex justify-center items-center p-0"
                >
                  <Plus className="size-[10px] md:size-4 duration-500 ease-in-out" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button disabled className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed">
          نفذت الكمية
        </button>
      )}
    </div>
  </div>
  );
};

export default ProductCard;
