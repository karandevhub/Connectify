
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePostScreen from './Screens/CreatpostScreen';
import Home from './Screens/Home';
import Profile from './Screens/profile';
import AppScreen from './Screens/AppScreen';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
   
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen name="createpost" component={CreatePostScreen} options={{headerShown:false}}/>
      <Stack.Screen name="profile" component={Profile} options={{headerShown:false}}/>
    </Stack.Navigator>
   
  );
}

