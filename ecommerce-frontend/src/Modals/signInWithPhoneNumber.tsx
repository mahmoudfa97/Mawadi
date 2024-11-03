// src/components/Login.tsx
import React, { useState } from 'react';
import { auth } from '../firebase'; // Ensure your Firebase config is properly imported
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

declare global {
    interface Window {
      recaptchaVerifier: import("firebase/auth").RecaptchaVerifier;
    }
  }

const LoginWithNumber: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');  // TypeScript type for phoneNumber
  const [otp, setOtp] = useState<string>('');                  // TypeScript type for otp
  const [verificationId, setVerificationId] = useState<string>('');  // TypeScript type for verificationId
  const [message, setMessage] = useState<string>('');          // TypeScript type for message
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Set up reCAPTCHA
  const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          console.log("reCAPTCHA verified");
        }
      });
    }
  };

  // Request OTP
  const requestOtp = () => {
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setMessage('OTP sent');
      })
      .catch((error) => {
        setMessage('Error sending OTP');
        console.error(error);
      });
  };

  // Verify OTP
  const verifyOtp = () => {
    if (!verificationId) return;

    const credential = PhoneAuthProvider.credential(verificationId, otp);

    signInWithCredential(auth, credential)
      .then((result) => {
        result.user?.getIdToken().then((token) => {
          // Save token and use it in backend calls
          localStorage.setItem('userToken', token);
          dispatch(login(result))
          setMessage('User signed in successfully');
          navigate('/myprofile')
        });
      })
      .catch((error) => {
        setMessage('Error verifying OTP');
        console.error(error);
      });
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <div id="recaptcha-container"></div>
        
        <h2 className="text-2xl font-semibold text-center mb-4">تسجيل الدخول برقم الهاتف</h2>
        
        <input
          type="text"
          className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />

        <button
          onClick={requestOtp}
          className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition-colors"
        >
          أرسل رمز التحقق
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          باستمرارك فإنك توافق على 
          <a href='/' className="text-blue-500 hover:underline"> الشروط والأحكام </a> و 
          <a href='/' className="text-blue-500 hover:underline"> سياسة الخصوصية </a>
        </p>

        {message && <p className="text-center text-green-500 mt-2">{message}</p>}

        {verificationId && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-center mb-4">يرجى تأكيد رقم الهاتف الخاص بك</h3>
            
            <input
              type="text"
              className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            
            <div className="flex justify-between">
              <button
                onClick={verifyOtp}
                className="bg-green-500 text-white py-2 px-4 rounded-md font-medium hover:bg-green-600 transition-colors w-full mr-2"
              >
                تأكيد
              </button>
              <button
                onClick={requestOtp}
                className="bg-gray-400 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-500 transition-colors w-full ml-2"
              >
                أعد الإرسال
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginWithNumber;
