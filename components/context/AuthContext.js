import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userid,setUserId]=useState('');
  const login = (email,password) => {
    axios
      .post(`${BASE_URL}/user/login`, { email, password })
      .then((response) => {
        setIsLoading(true);
        const token = response.data.access_token;
        console.log(response.data)
        console.log('userid',response.data.userId)
        AsyncStorage.setItem('userid',response.data.userId);
        Alert.alert('Congratulations', 'Your account has been created.', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        setUserToken(token);
        alert
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
  

    axios
      .post(`${BASE_URL}/user/signup`, body)
      .then((response) => {
        setIsLoading(true);
        const token = response.data.access_token;
        console.log('Signup successful. Token:', token);
        setUserToken(token);
        AsyncStorage.setItem('token', token);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the request:', error);
      });

    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userid');
    AsyncStorage.removeItem('token');
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
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, signup,userid}}>
      {children}
    </AuthContext.Provider>
  );
};
