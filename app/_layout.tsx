import { Stack } from 'expo-router';
import { AuthProvider } from './AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
        {/* root pages */}
        <Stack.Screen name="index" />
        <Stack.Screen name="about" />
        <Stack.Screen name="Login" />

        {/* profiles */}
        <Stack.Screen name="Profiles/chickfilA" />
        <Stack.Screen name="Profiles/Student" />
        <Stack.Screen name="Profiles/Dining" />

        {/* meal / registration */}
        <Stack.Screen name="Meal/profileSelection" />
        <Stack.Screen name="membership" />
        <Stack.Screen name="Registration" />

        {/* admin hierarchy — note: use "Admin", not "Admin/index" */}
        <Stack.Screen name="Admin" />
        <Stack.Screen name="Admin/Admin_users/students" />
        <Stack.Screen name="Admin/Admin_users/employees" />

        {/* other */}
        <Stack.Screen name="Locations" />
        <Stack.Screen name="Menu/ChickfilA" />
        <Stack.Screen name="Menu/Dining" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthProvider>
  );
}
