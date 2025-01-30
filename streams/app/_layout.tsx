import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider as PaperProvider } from 'react-native-paper';

import { useColorScheme } from '@/hooks/useColorScheme';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '@/app/OnBoarding';
import SignInScreen from '@/app/Signin';
import SignUpScreen from '@/app/Signup';
import HomeScreen from '@/app/Home';
import PaymentScreen from './Payment';
import WatchScreen from './Watch';

type RootStackParamList = {

  Onboarding: undefined;
  Signin: undefined;
  Signup: undefined;
  Home: undefined;
  Payment: undefined;
  Watch: { streamUrl: string };

};

const RootStack = createStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootStack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
          <RootStack.Screen name="Signin" component={SignInScreen} />
          <RootStack.Screen name="Signup" component={SignUpScreen} />
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Payment" component={PaymentScreen} />
          <RootStack.Screen name="Watch" component={WatchScreen} />
        </RootStack.Navigator>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}