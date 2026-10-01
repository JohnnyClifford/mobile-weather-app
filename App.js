import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import ErrorBoundary from './src/components/ErrorBoundary';
import RootTabs from './src/navigation/RootTabs';
import { useWeather } from './src/hooks/useWeather';
import { colors } from './src/theme';

// Tell expo-notifications how to present an alert when the app is foregrounded.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/**
 * Owns shared weather state, sets up the Android notification channel,
 * and renders the tab navigator.
 */
function WeatherApp() {
  const weather = useWeather();

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('weather', {
        name: 'Weather alerts',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.ink }}>
      <NavigationContainer>
        <RootTabs weather={weather} />
      </NavigationContainer>
    </SafeAreaView>
  );
}

/** App entry wrapped with the safe-area provider and render error boundary. */
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <WeatherApp />
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
