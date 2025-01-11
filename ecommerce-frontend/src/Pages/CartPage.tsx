"use client"

import { Minus, Plus } from 'lucide-react'

import { useState } from "react"
import { Input } from '../components/UI/Input'
import { Button } from '../components/UI/button'
import { useAppSelector } from '../store/hooks'
import { CartItem } from "../types/Constants";
import { useNavigate } from 'react-router-dom'
import { post } from '../services/api'
import { IUser } from '../types/User'

export default function CartPage() {
  const cartItemss = useAppSelector((state: { cart: { items: any; }; }) => state.cart.items);
  const loadedUser: IUser | null = useAppSelector((state) => state.user.user);
  const [cartItems, setCartItems] = useState<CartItem[]>(cartItemss)
  const navigate = useNavigate()
  const updateQuantity = (id: number, increment: boolean) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
          : item
      )
    )
  }

  const handleMoveToCheckout = () => navigate('/checkout')
  const handleMoveTobackToStore = () => navigate('/')
    
  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }
  const addToWishList = (id: number) => {
    let wishlist = {
      productId: id
    }
   post(`${window.location.origin}/api/users/wishlist`, wishlist, loadedUser?.role)
  }
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = 60.00
  const deliveryCharge = 0.00
  const estimatedTax = 20.00
  const total = subtotal - discount + deliveryCharge + estimatedTax

  return (
    <div className="p-6">
      <div className="flex justify-between items-center bg-orange-500 text-white p-4 rounded-lg mb-6">
        <p>There are {cartItems.length} products in your cart</p>
        <button className="hover:underline">Clear cart</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-6 pb-6 border-b">
              <div className="w-24 h-24 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{item.name}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  Color: {item.colors} | Size: {item.sizes  }
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, false)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, true)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Remove
                  </button>
                  <button 
                  onClick={() => addToWishList(item.id)}
                  className="text-sm text-gray-500 hover:text-gray-700">
                    Add to Wishlist
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{`${item.price?.toFixed(2)}`}</p>
                <p className="text-sm text-gray-500">{`+${item.tax?.toFixed(2)} Tax`}</p>
                <p className="text-sm font-medium mt-2">
                  {`Total: ₪ ${((item?.price + item?.tax) * item?.quantity)?.toFixed(2)}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg h-fit">
          <div className="mb-6">
            <h3 className="font-medium mb-2">Have a Promo Code?</h3>
            <div className="flex gap-2">
              <Input placeholder="CODE123" />
              <Button variant="outline">Apply</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Order Summary</h3>
            
            <div className="flex justify-between text-sm">
              <span>Sub Total:</span>
              <span>₪{subtotal?.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm text-red-600">
              <span>Discount:</span>
              <span>-₪{discount?.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Delivery Charge:</span>
              <span>₪{deliveryCharge?.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Estimated Tax (15.5%):</span>
              <span>₪{estimatedTax?.toFixed(2)}</span>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-medium">
                <span>Total Amount:</span>
                <span>₪{total?.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-md text-sm flex items-center gap-2">
              <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              icon for shipping
              </span>
              Estimated Delivery by 25 April, 2024
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button variant="outline" onClick={ handleMoveTobackToStore}>Continue Shopping</Button>
              <Button className="bg-green-500 hover:bg-green-600" onClick={ handleMoveToCheckout}>Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

