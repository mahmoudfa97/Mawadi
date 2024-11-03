import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../Constants/Constants';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import { Minus, Plus } from 'lucide-react';

interface ProductCardProps {
    product: IProduct; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    
    const [quantity, setQuantity] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showQuantityInput, setShowQuantityInput] = useState(false);

    const incrementQuantity = () => {
      setQuantity(prev => prev + 1);
    }
  
    const decrementQuantity = () => {
      setQuantity(prev => Math.max(prev - 1, 0));
    }

    const handleAddToCart = () => {
      dispatch(addToCart({ ...product }));
    }

    const handleQuantityButtonClick = () => {
      if (quantity === 0) {
        setQuantity(1);
      }
      setShowQuantityInput(true);
    }

    return (
      <div 
        className="w-64 bg-white rounded-lg shadow-md overflow-hidden" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-64 w-full">
          <Link to={`/products/:${product.name}`} state={product}> 
            <img
              src={`/${product.image}`}
              alt={product.name}
              className="h-64 w-full object-cover"
            />
          </Link>
        </div>
        <div className="p-4 h-[180px] flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 h-12 line-clamp-2 overflow-hidden">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.price?.toFixed(2)} {product.currency}</p>
          </div>
          {product.inStock ? (
            <div className="flex w-full duration-700 ease-in-out transition-all relative overflow-hidden rounded-md items-center">
              <div className={`flex justify-between items-center gap-1 w-full duration-700 ease-in-out transition-all ${showQuantityInput ? 'opacity-100' : 'opacity-0 rtl:translate-x-full ltr:-translate-x-full'}`}>
                <button 
                  onClick={decrementQuantity} 
                  className="themeButton button-style bg-[#F8F8F8] border-0 h-7 aspect-square sm:h-8 w-7 sm:w-[2.5rem] flex justify-center items-center p-0"
                >
                  <Minus className="size-[10px] md:size-4 duration-500 ease-in-out" />
                </button>
                <div className="border-none quantity-text text-base flex justify-center items-center p-1 h-7 sm:h-8 button-style aspect-square md:min-w-[2.5rem] text-center font-bold cursor-pointer rounded-md text-black bg-[#F8F8F8]">
                  <span className="pb-[0.5px]">{quantity}</span>
                </div>
                <button 
                  onClick={incrementQuantity} 
                  className="themeButton button-style duration-500 bg-[#F8F8F8] border-0 h-7 w-7 aspect-square sm:h-8 sm:w-[2.5rem] flex justify-center items-center p-0"
                >
                  <Plus className="size-[10px] md:size-4 duration-500 ease-in-out" />
                </button>
              </div>
              <div className={`flex duration-700 absolute left-0 ease-in-out transition-all w-full justify-center ${showQuantityInput ? 'opacity-0' : 'opacity-100'}`}>
                <button 
                  onClick={handleQuantityButtonClick}
                  className="themeButton button-style main-plus-button duration-500 bg-[#F8F8F8] border-0 h-7 sm:h-8 w-full flex justify-center items-center p-0"
                >
                  <Plus className="size-[10px] md:size-4 duration-500 ease-in-out" />
                </button>
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