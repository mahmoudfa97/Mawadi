import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { clearCart } from '../store/cartSlice'
import { PayPalButtons } from "@paypal/react-paypal-js"
import { useNavigate } from 'react-router-dom'
import { Gift, Video, CreditCard, Truck } from 'lucide-react';
import { updateShippingInfo, updatePaymentMethod, attachVideoMessage, placeOrder } from '../store/actions'
import CustomerInformationForm from '../components/customerInformationForm/CustomerInformationForm'
import GiftSelection from '../components/GiftSelection/GiftSelection'
import PaymentMethod from '../components/PaymentMethod/PaymentMethod'

const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const { shippingInfo, paymentMethod, videoMessage, orderSummary } = useAppSelector((state) => state.checkout);
 
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [paymentError, setPaymentError] = useState<string | null>(null)

  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)

  const handlePayPalApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      console.log('Transaction completed by ' + details.payer.name.given_name);

      // Create order data
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: parseFloat(`${item.price}`),
        })),
        totalAmount: parseFloat(details.purchase_units[0].amount.value),
      };

      // Save order to MongoDB
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to save order');
      }

      alert('شكراً لطلبك! تم الدفع بنجاح.');
      dispatch(clearCart());
    } catch (error) {
      console.error('Error during PayPal transaction:', error);
      alert('حدث خطأ أثناء المعاملة. الرجاء المحاولة مرة أخرى.');
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
    setTotalPrice(total);
  };



  const handlePayPalError = (err: any) => {
    setPaymentError('حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.')
    console.error(err)
  }



  const handlePlaceOrder = () => {
    dispatch(placeOrder());
    // Here you would typically make an API call to create the order
    alert('Order placed successfully! You will receive tracking information shortly.');
    alert('شكراً لطلبك! سيتم التواصل معك قريباً.')
    dispatch(clearCart())

  };
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-4">الدفع</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <GiftSelection />

        <CustomerInformationForm />

      </div>
      <PaymentMethod />
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">تفاصيل الطلب</h2>
      <div className="border-t border-b py-4">
          <div className="flex-col justify-between mb-2">
            <span>Gift:</span>
            {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} x {item.quantity}</span>
            </div>
          ))}
          </div>
          <div className="flex justify-between mb-2">
            <span>Price:</span>
            <span>${orderSummary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>${orderSummary.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax:</span>
            <span>${orderSummary.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mt-4">
            <span>Total:</span>
            <span>${orderSummary.total.toFixed(2)}</span>
          </div>
        </div>
      </div>


      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Truck className="mr-2" /> Shipping Tracking
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Once your order is placed, you will receive a tracking number and estimated delivery date here.
        </p>
        <p className="text-sm text-gray-600">
          You can also check your order status and tracking information in your account dashboard after purchase.
        </p>
      </div>
      {paymentMethod === 'paypal'? (
        <div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">الدفع</h2>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: total.toString(),
                                currency_code: "ILS"
                            },
                        },
                    ],
                    intent: 'CAPTURE'
                });
              }}
              onApprove={handlePayPalApprove}
              onError={handlePayPalError}
            />
          </div>
          {paymentError && <div className="text-red-500 mt-4">{paymentError}</div>}
        </div>
      ): <div />}
      <button
        onClick={handlePlaceOrder}
        className="mt-8 bg-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors w-full"
      >
        Place Order
      </button>
    </div>
  )
}

export default CheckoutPage