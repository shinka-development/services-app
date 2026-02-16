import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '../hooks/useColorScheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

import { NotificationProvider } from '../context/NotificationContext';
import { ServiceProvider } from '../context/ServiceContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ServiceProvider>
      <NotificationProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Back' }} />
            <Stack.Screen name="Modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </NotificationProvider>
    </ServiceProvider>
  );
}
