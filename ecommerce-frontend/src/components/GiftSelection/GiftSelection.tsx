// UserActions.js
import { useState } from 'react';
import { attachVideoMessage, updateShippingInfo } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Input } from '@mui/material'
import { Gift, Video, CreditCard, Truck } from 'lucide-react';

const GiftSelection = () => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      dispatch(attachVideoMessage(`${e.target.files[0].name}`));
    }
  };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Gift className="mr-2" /> Gift Selection
      </h2>
      <div className="mb-4">
        <p className="font-medium">Selected Gift:</p>
        <p>{cartItems[0]?.name}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="videoMessage" className="block mb-2 font-medium flex items-center">
          <Video className="mr-2" /> Attach Video Message
        </label>
        <input
          type="file"
          id="videoMessage"
          accept="video/*"
          onChange={handleVideoUpload}
          className="w-full p-2 border rounded"
        />
        {videoFile && <p className="mt-2 text-sm text-green-600">Video attached: {videoFile.name}</p>}
      </div>
    </div>
    );
};

export default GiftSelection;
