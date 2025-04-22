import { Stack } from "expo-router";
import "./globals.css";
import ToastManager from "toastify-react-native/components/ToastManager";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      
    </>

  );
}
