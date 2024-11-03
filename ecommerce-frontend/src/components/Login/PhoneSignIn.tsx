import React, { useState } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../firebase"
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2';
import { Button, TextField } from '@mui/material';

const PhoneSignIn: React.FC = () => {
  const [phone, setPhone] = useState('');

  const sendOTP = async() => {
   try {
    const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
    const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
    console.log(confirmation)
    
   } catch (error) {
    console.log(error)
   } 
  };
  const verifyOTP = async() => {
    try {
     const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
     const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
     console.log(confirmation)
     
    } catch (error) {
     console.log(error)
    } 
   };
   
  return (
    <div>
      <PhoneInput 
      country={'ils'}
      value={phone}
      onChange={(phone)=>setPhone("+"+phone)}
      />
      <button onClick={sendOTP}>send OTP</button>
      <div id='recaptcha'></div>
    <TextField></TextField>
    <br></br>
    <Button variant='contained' onClick={verifyOTP}></Button>
    </div>
  );
};

export default PhoneSignIn;
