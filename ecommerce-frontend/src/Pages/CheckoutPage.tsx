import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { clearCart } from '../store/slices/cartSlice'
import { PayPalButtons } from "@paypal/react-paypal-js"
import { useNavigate } from 'react-router-dom'
import { Gift, Video, CreditCard, Truck, Package, ShieldCheck } from 'lucide-react';
import { updateShippingInfo, updatePaymentMethod, attachVideoMessage, placeOrder } from '../store/actions'
import CustomerInformationForm from '../components/customerInformationForm/CustomerInformationForm'
import GiftSelection from '../components/GiftSelection/GiftSelection'
import PaymentMethod from '../components/PaymentMethod/PaymentMethod'
import { Card } from '../components/UI/card'
import { Input } from '../components/UI/Input'
import { Label } from '../components/UI/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/UI/select'
import { Button } from '../components/UI/button'
import { RadioGroup, RadioGroupItem } from '../components/UI/radio-group'

const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [shippingMethod, setShippingMethod] = useState("dhl")
  const [paymentMethod, setPaymentMethod] = useState("paypal")
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
    <div className="container mx-auto p-6">
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Personal Details */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="First name" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Last name" />
            </div>
            <div>
              <Label htmlFor="email">Your Email</Label>
              <Input id="email" type="email" placeholder="Email" />
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" type="tel" placeholder="Number" />
            </div>
          </div>
        </Card>

        {/* Shipping Details */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Shipping Address</Label>
              <textarea
                id="address"
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter address"
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input id="zipCode" placeholder="zip-code" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city1">City 1</SelectItem>
                    <SelectItem value="city2">City 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="country1">Country 1</SelectItem>
                    <SelectItem value="country2">Country 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="link" className="text-orange-500 p-0">
              + Add New Billing Address
            </Button>
          </div>
        </Card>

        {/* Shipping Method */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
          <RadioGroup
            defaultValue="dhl"
            onValueChange={setShippingMethod}
            className="grid sm:grid-cols-2 gap-4"
          >
            <div className={`border rounded-lg p-4 ${shippingMethod === 'dhl' ? 'border-orange-500' : ''}`}>
              <RadioGroupItem value="dhl" id="dhl" className="peer sr-only" />
              <Label
                htmlFor="dhl"
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    alt="DHL"
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <div>
                    <div className="font-medium">DHL Fast Services</div>
                    <div className="text-sm text-gray-500">Delivery - Today</div>
                  </div>
                </div>
                <div className="font-medium">$10.00</div>
              </Label>
            </div>

            <div className={`border rounded-lg p-4 ${shippingMethod === 'fedex' ? 'border-orange-500' : ''}`}>
              <RadioGroupItem value="fedex" id="fedex" className="peer sr-only" />
              <Label
                htmlFor="fedex"
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    alt="FedEx"
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <div>
                    <div className="font-medium">FedEx Services</div>
                    <div className="text-sm text-gray-500">Delivery - Today</div>
                  </div>
                </div>
                <div className="font-medium">$10.00</div>
              </Label>
            </div>

            <div className={`border rounded-lg p-4 ${shippingMethod === 'ups' ? 'border-orange-500' : ''}`}>
              <RadioGroupItem value="ups" id="ups" className="peer sr-only" />
              <Label
                htmlFor="ups"
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    alt="UPS"
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <div>
                    <div className="font-medium">UPS Services</div>
                    <div className="text-sm text-gray-500">Delivery - Tomorrow</div>
                  </div>
                </div>
                <div className="font-medium">$8.00</div>
              </Label>
            </div>

            <div className={`border rounded-lg p-4 ${shippingMethod === 'courier' ? 'border-orange-500' : ''}`}>
              <RadioGroupItem value="courier" id="courier" className="peer sr-only" />
              <Label
                htmlFor="courier"
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center">
                    <Package className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-medium">Our Courier Services</div>
                    <div className="text-sm text-gray-500">Delivery - 25 Apr 2024</div>
                  </div>
                </div>
                <div className="font-medium">$0.00</div>
              </Label>
            </div>
          </RadioGroup>
        </Card>

        {/* Payment Method */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <RadioGroup
            defaultValue="paypal"
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            <div className={`border rounded-lg p-4 ${paymentMethod === 'paypal' ? 'border-orange-500' : ''}`}>
              <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
              <Label
                htmlFor="paypal"
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    alt="PayPal"
                    width={80}
                    height={40}
                    className="rounded"
                  />
                  <div className="text-sm text-gray-500">
                    Safe Payment Online Credit card needed. PayPal account is not necessary
                  </div>
                </div>
              </Label>
            </div>

            <div className={`border rounded-lg p-4 ${paymentMethod === 'creditCard' ? 'border-orange-500' : ''}`}>
              <RadioGroupItem value="card" id="card" className="peer sr-only" />
              <Label
                htmlFor="card"
                className="cursor-pointer space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">Credit card</div>
                  <div className="flex gap-2">
                    <img
                      src="/placeholder.svg"
                      alt="Mastercard"
                      width={40}
                      height={25}
                      className="rounded"
                    />
                    <img
                      src="/placeholder.svg"
                      alt="Visa"
                      width={40}
                      height={25}
                      className="rounded"
                    />
                    <img
                      src="/placeholder.svg"
                      alt="American Express"
                      width={40}
                      height={25}
                      className="rounded"
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Safe Money Transfer using your bank account. Visa , Master Card ,Discover , American Express
                </div>
                {paymentMethod === 'creditCard' && (
                  <div className="grid gap-4 pt-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YYYY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV/CCV</Label>
                        <Input id="cvv" placeholder="000" />
                      </div>
                    </div>
                  </div>
                )}
              </Label>
            </div>
          </RadioGroup>

          <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-center gap-2 text-sm text-green-700">
            <ShieldCheck className="w-5 h-5" />
            We adhere entirely to the data security standards of the payment card industry.
          </div>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="font-medium mb-2">Have a Promo Code?</h3>
            <div className="flex gap-2">
              <Input placeholder="CODE123" />
              <Button variant="outline">Apply</Button>
            </div>
          </div>

          <h3 className="font-medium mb-4">Order Summary</h3>
          
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">Size: {item.size}</div>
                </div>
                <div className="text-right">
                  <div>${item.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">Q: {item.quantity}</div>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Sub Total:</span>
                <span>$777.00</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Discount:</span>
                <span>-$60.00</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (15.5%):</span>
                <span>$20.00</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium">
                <span>Total Amount</span>
                <span>$737.00</span>
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-md text-sm flex items-center gap-2">
              <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                23
              </span>
              Estimated Delivery by 25 April, 2024
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 text-white space-y-6">
          <div className="flex gap-4">
            <Package className="w-6 h-6" />
            <div>
              <h4 className="font-medium">Streamline box shipping information</h4>
              <p className="text-sm text-gray-300">
                Below your selected items, enter your zip code to calculate the shipping charge. We like to make shipping simple and affordable!
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <ShieldCheck className="w-6 h-6" />
            <div>
              <h4 className="font-medium">30 Day money back guarantee</h4>
              <p className="text-sm text-gray-300">
                Money Return In 30 Day In Your Bank Account
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline">Back To Cart</Button>
          <Button className="bg-green-500 hover:bg-green-600">Checkout Order</Button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CheckoutPage