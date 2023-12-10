import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './context/AuthContext';
import { useContext} from 'react';
import AppDrawer from './AppDrawer';
import Auth from './Auth';

export default function AppNav() {
  const { isLoading, userToken } = useContext(AuthContext);
 

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {(userToken !== null)? <AppDrawer/> : <Auth />}
    </NavigationContainer>
  );
}
