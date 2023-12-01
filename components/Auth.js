import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import LoginSignup from './Screens/LoginSignup';
import AppScreen from './Screens/AppScreen';
import CreatePostScreen from './Screens/CreatpostScreen';

const Stack = createStackNavigator();

export default function Auth() {
  return (
      <Stack.Navigator initialRouteName="LoginSignup">
        <Stack.Screen name="LoginSignup" component={LoginSignup} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={RegisterScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
  );
}
