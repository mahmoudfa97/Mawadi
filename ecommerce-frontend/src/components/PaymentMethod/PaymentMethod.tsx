// UserActions.js
import { updatePaymentMethod } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CreditCard } from 'lucide-react';

const PaymentMethod = () => {
  const dispatch = useAppDispatch()
  const { paymentMethod } = useAppSelector((state) => state.checkout);
  const handlePaymentMethodChange = (method: "creditCard" | "paypal") => {
    dispatch(updatePaymentMethod(method));
  };

    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <CreditCard className="mr-2" /> Payment Method
      </h2>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={paymentMethod === 'creditCard'}
            onChange={() => handlePaymentMethodChange('creditCard')}
            className="mr-2"
          />
          Credit Card
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={() => handlePaymentMethodChange('paypal')}
            className="mr-2"
          />
          PayPal
        </label>
      </div>
    </div>
    );
};

export default PaymentMethod;
