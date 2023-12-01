import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import AppScreen from './Screens/AppScreen';
import AppDrawer from './AppDrawer';
import Auth from './Auth';

export default function AppNav() {
  const { isLoading, userToken } = useContext(AuthContext);
 

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {(userToken !== null)? <AppDrawer/> : <Auth />}
    </NavigationContainer>
  );
}
