import { Stack } from "expo-router";
import { AuthProvider } from "./AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="about" />
        <Stack.Screen name="Login" />
        <Stack.Screen name="Profiles/chickfilA" />
        <Stack.Screen name="Profiles/Student" />
        <Stack.Screen name="Meal/profileSelection" />
        <Stack.Screen name="membership" />
        <Stack.Screen name="Registration" />
        <Stack.Screen name="Profiles/Dining" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="Profiles/Admin" />
      </Stack>
    </AuthProvider>
  );
}
