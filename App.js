import React, { startTransition, useEffect, useState } from "react";
import "react-native-gesture-handler";
import AppNav from "./components/AppNav";
import { AuthProvider } from "./components/context/AuthContext";
import SplashScreen from "./components/Screens/SplashScreen";

export default function App() {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
    }, 0);
  }, []);

  return (
    <AuthProvider>{animating ? <SplashScreen /> : <AppNav />}</AuthProvider>
  );
}
