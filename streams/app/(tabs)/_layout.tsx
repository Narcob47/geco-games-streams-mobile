import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingScreen from '../OnBoarding';
import SignInScreen from '../Signin';
import SignUpScreen from '../Signup';
import HomeScreen from '../Home';

const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signin" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




