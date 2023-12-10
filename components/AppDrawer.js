import * as React from "react";
import { Button, View } from "react-native";
import { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppScreen from "./Screens/AppScreen";
import { AuthContext } from "./context/AuthContext";
const Drawer = createDrawerNavigator();

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Log out"
        style={{
          height: 50,
          width: 130,
          borderRadius: 10,
          backgroundColor: "skyblue",
        }}
        onPress={() => {
          logout();
          
        }}
      />
    </View>
  );
};

export default function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="VibeLink">
      <Drawer.Screen
        name="Vibelink"
        component={AppScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutButton}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
