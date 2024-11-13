import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Tabs, Tab } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { loginWithEmail, loginWithPhone, verifyPhoneCode } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setError('');
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      navigate('/myprofile');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithPhone(phoneNumber);
      setIsVerifying(true);
    } catch (err) {
      setError('Invalid phone number');
      setIsVerifying(false);

    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyPhoneCode(verificationCode);
      navigate('/admin');
    } catch (err) {
      setError('Invalid verification code');
    }
  };
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // If the phone number starts with "0" and has no country code
    if (input.startsWith('0') && !input.startsWith('+')) {
      // Replace "0" with country code, e.g., "+1"
      input = '+972' + input.slice(1);
    }

    setPhoneNumber(input);
  };
  return (
    <Box sx={{ maxWidth: 300, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Email" />
        <Tab label="Phone" />
      </Tabs>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {activeTab === 0 && (
        <Box component="form" onSubmit={handleEmailLogin}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login with Email
          </Button>
        </Box>
      )}
      {activeTab === 1 && (
        <Box component="form" onSubmit={isVerifying ? handleVerifyCode : handlePhoneLogin}>
          {!isVerifying ? (
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
          ) : (
            <TextField
              label="Verification Code"
              fullWidth
              margin="normal"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {isVerifying ? 'Verify Code' : 'Login with Phone'}
          </Button>
        </Box>
      )}
      <div id="recaptcha-container"></div>
    </Box>
  );
};

export default Login;