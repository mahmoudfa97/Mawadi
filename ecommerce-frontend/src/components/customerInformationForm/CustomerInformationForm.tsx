// UserActions.js
import { useState } from 'react';
import { updateShippingInfo } from '../../store/actions';
import { useAppDispatch } from '../../store/hooks';
import { Input } from '@mui/material'

const CustomerInformationForm = () => {
  const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
    })


  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateShippingInfo(formData));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">معلومات العميل</h2>
      <form onSubmit={handleShippingSubmit} dir='rtl' className="space-y-4">
        <div>
            <label htmlFor="name">الاسم</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">البريد الإلكتروني</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="address">العنوان</label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="city">المدينة</label>
            <Input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="zipCode">الرمز البريدي</label>
            <Input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>
        </form>
      </div>
    );
};

export default CustomerInformationForm;
