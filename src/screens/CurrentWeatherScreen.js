import { ScrollView, Text, Pressable, RefreshControl, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { colors, styles } from '../theme';
import { weatherGradient } from '../utils/weather';

/** Current weather search, location shortcut, and pull-to-refresh screen. */
export default function CurrentWeatherScreen({ weather }) {
  const condition = weather.weatherData?.weather?.[0]?.main || '';
  return <LinearGradient colors={weatherGradient(condition)} style={styles.screen}>
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" refreshControl={<RefreshControl refreshing={weather.refreshing} onRefresh={weather.onRefresh} tintColor={colors.white} />}>
      <Text style={{ color: colors.white, fontSize: 30, fontWeight: '800', marginBottom: 16 }}>Weather</Text>
      <SearchBar onSearch={weather.fetchWeather} loading={weather.loading} />
      <Pressable accessibilityRole="button" onPress={weather.fetchWeatherByLocation} style={[styles.button, { backgroundColor: 'rgba(255,255,255,0.22)' }]}><Text style={styles.buttonText}>◎  Use my location</Text></Pressable>
      {weather.error && <View style={{ marginTop: 14 }}><Text accessibilityRole="alert" style={styles.error}>{weather.error}</Text>{weather.locationDenied && <Pressable onPress={weather.openLocationSettings} style={styles.button}><Text style={styles.buttonText}>Open location settings</Text></Pressable>}</View>}
      {weather.loading && !weather.weatherData && <Text style={{ color: colors.white, textAlign: 'center', padding: 24 }}>Loading weather…</Text>}
      <View style={{ marginTop: 18 }}><WeatherCard data={weather.weatherData} unit={weather.unit} convertTemperature={weather.convertTemperature} convertWindSpeed={weather.convertWindSpeed} getWindUnit={weather.getWindUnit} isFavorite={weather.isFavorite} onToggleFavorite={(city) => weather.isFavorite(city) ? weather.removeFavorite(city) : weather.addFavorite(city)} uvIndex={weather.uvIndex} /></View>
    </ScrollView>
  </LinearGradient>;
}
