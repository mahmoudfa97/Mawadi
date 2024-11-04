import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { signInWithPhoneNumber, User as FirebaseUser, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../firebase';

interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phoneNumber: string) => Promise<void>;
  verifyPhoneCode: (code: string) => Promise<void>;
  logout: () => void;
  register: (firstName: string, lastName: string, email: string, password: string, phoneNumber: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const setAuthToken = (token: string | null) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get<User>('/api/users/profile');
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const res = await axios.post<{ token: string }>('/api/users/login', { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      await fetchUser();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithPhone = async (phoneNumber: string) => {
    try {
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
      
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
    } catch (error) {
      console.error('Phone login error:', error);
      throw error;
    }
  };

  const verifyPhoneCode = async (code: string) => {
    if (!confirmationResult) {
      throw new Error('No confirmation result found');
    }

    try {
      const result = await confirmationResult.confirm(code);
      const firebaseUser = result.user as FirebaseUser;
      const idToken = await firebaseUser.getIdToken();
      
      const res = await axios.post<{ token: string }>('/api/users/firebase-login', { idToken });
      const { token } = res.data;
      
      localStorage.setItem('token', token);
      setAuthToken(token);
      await fetchUser();
    } catch (error) {
      console.error('Phone verification error:', error);
      throw error;
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string, phoneNumber: string) => {
    try {
      const res = await axios.post<{ token: string }>('/api/users/register', { firstName, lastName, email, password, phoneNumber });
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      await fetchUser();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
    auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loginWithEmail, loginWithPhone, verifyPhoneCode, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};