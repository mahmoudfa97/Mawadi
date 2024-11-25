import { put } from "../../services/api";
import { useAppSelector } from "../../store/hooks";
import { IUser } from "../../types/User";
import React, { useState } from "react";
import { Button } from "../UI/button";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const loadedUser: IUser | null = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<IUser | null>(loadedUser);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading user data...</p>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => prev && { ...prev, [name]: value });
  };
  const updateUserProfile = async () => {
    const userId = 'USER_ID_HERE'; // Replace with actual user ID
    const updateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      birthday: '1990-01-01',
      gender: 'male',
      avatar: 'https://example.com/avatar.jpg',
      giftPreferences: ['electronics', 'books'],
    };
  
    try {
      const response = await put(`users/profile?userId=${user._id}`, user);

      if (response.data) {
        console.log('Profile updated successfully:', response.data);
      } else {
        console.error('Error updating profile:', response.status);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  const handleSave = () => {
    console.log("Saved user data:", user);
    updateUserProfile()
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-6">
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Avatar"
              className="h-28 w-28 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user.firstName} {user.lastName}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phoneNumber}</p>
              {isEditing && (
                <button
                  onClick={() => console.log("Change Avatar")}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  Change Avatar
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-6"> 
            {loadedUser?.role === 'admin' ? (<Button onClick={()=> navigate('/admin')}>Admin Panel</Button>) : ''}
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-600">First Name</label>
              {isEditing ? (
                <input
                  name="firstName"
                  value={user.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p>{user.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600">Last Name</label>
              {isEditing ? (
                <input
                  name="lastName"
                  value={user.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p>{user.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={user.dateOfBirth?.toString().substring(0, 10)}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p>{new Date(user.dateOfBirth).toLocaleDateString()}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600">Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={user.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer not to say">Prefer not to say</option>
                </select>
              ) : (
                <p>{user.gender}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              {isEditing ? (
                <input
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Order History</h2>
          <ul className="mt-4">
            {user.orders.map((order, idx) => (
              <li
                key={idx}
                className="p-4 bg-gray-50 rounded-md shadow-sm mb-4 flex justify-between"
              >
                <div>
                  <p className="font-semibold">Order ID: {order}</p>
                  <p className="text-gray-600">Order Status: Delivered</p>
                </div>
                <div>
                  <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                  <p className="font-semibold">Total: $100.00</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Preferences */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Preferences</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {user.giftPreferences?.map((pref, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md text-sm font-medium"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
