import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userid,setUserId]=useState('');


  const login = async(email,password) => {
    setIsLoading(true);
   await axios
      .post(`${BASE_URL}/user/login`, { email, password })
      .then((response) => { 
        const token = response.data.access_token;
        console.log(response.data)
        console.log('userid',response.data.userId)
        AsyncStorage.setItem('userid',response.data.userId);
        setUserId(response.data.userId)
        setUserToken(token);
        AsyncStorage.setItem('token', token);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the request:', error);
      });

    setIsLoading(false);
  };


  const signup = (UserName,email,password) => {
    const body={
      "userName":UserName,
      "email":email,
      "password":password
    
    }
  
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/user/signup`, body)
      .then((response) => {
        const token = response.data.access_token;
        console.log('Signup successful. Token:', response.data.userId);
        setUserToken(token);
        AsyncStorage.setItem('userid',response.data.userId);
        setUserId(response.data.userId)
        AsyncStorage.setItem('token', token);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the request:', error);
      });

  };

  const logout = async() => {
    setIsLoading(true);
    setUserToken(null);
    setUserId(null)
    await AsyncStorage.removeItem('userid');
    await AsyncStorage.removeItem('token');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let user = await AsyncStorage.getItem('token');
      let userid= await AsyncStorage.getItem('userid');
      setUserToken(user);
      setUserId(userid);
      setIsLoading(false);
    } catch (e) {
      console.log(`is logged in error(e)`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout,setIsLoading, isLoading, userToken, signup,userid}}>
      {children}
    </AuthContext.Provider>
  );
};
