import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CurrentWeatherScreen from '../screens/CurrentWeatherScreen';
import ForecastScreen from '../screens/ForecastScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

/** Icon name for each route, in both filled and outline variants. */
const TAB_ICONS = {
  Current: 'partly-sunny',
  Forecast: 'calendar',
  Favorites: 'star',
  Settings: 'settings',
};

/**
 * Bottom-tab navigator. Weather state is created once in App and passed
 * down to each screen so all four tabs share the same data.
 */
export default function RootTabs({ weather }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarLabelStyle: { fontWeight: '700', paddingBottom: 3 },
        tabBarStyle: { height: 62, paddingTop: 6 },
        tabBarIcon: ({ color, size, focused }) => {
          const base = TAB_ICONS[route.name];
          const name = focused ? base : `${base}-outline`;
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Current"
        options={{ title: 'Current Weather', tabBarLabel: 'Weather' }}
      >
        {() => <CurrentWeatherScreen weather={weather} />}
      </Tab.Screen>

      <Tab.Screen name="Forecast">
        {() => <ForecastScreen weather={weather} />}
      </Tab.Screen>

      <Tab.Screen name="Favorites">
        {() => <FavoritesScreen weather={weather} />}
      </Tab.Screen>

      <Tab.Screen name="Settings">
        {() => <SettingsScreen weather={weather} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}