// src/components/Login.tsx
import React from 'react';
import { RedirectResults, signInWithGoogleRedirect } from '../firebase'; // Ensure your Firebase config is properly imported

declare global {
    interface Window {
      recaptchaVerifier: import("firebase/auth").RecaptchaVerifier;
    }
  }

const LoginWithGooglePopUp: React.FC = () => {
    const loginUser = async ()=>{
        await signInWithGoogleRedirect()
         RedirectResults()
    }
    

  return (
    <div>
        <h2>Sign in with Google</h2>
      <button onClick={loginUser}> Sign in with Google</button>
    </div>
  );
};

export default LoginWithGooglePopUp;
