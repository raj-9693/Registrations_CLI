import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Context Create किया
export const AuthContext = createContext();

// 2. Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const[userDeta,setuserDeta] =useState({})
  const [isLoading, setIsLoading] = useState(true);

  // App खुलते ही चेक करो कि AsyncStorage में टोकन है या नहीं
  useEffect(() => {
    const checkToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('userToken');
        if (savedToken) {
          setToken(savedToken);
        }
      } catch (error) {
        console.error('Token fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  // Login Function (AsyncStorage + State दोनों में सेट करेगा)
  const login = async (newToken) => {
    try {
      await AsyncStorage.setItem('userToken', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Token save error:', error);
    }
  };

  // Logout Function (AsyncStorage + State दोनों से हटाएगा)
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setToken(null);
      setuserDeta({}); // 👈 Logout par user data bhi empty kar dein
    } catch (error) {
      console.error('Token remove error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout ,setuserDeta,userDeta}}>
      {children}
    </AuthContext.Provider>
  );
};