import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import { fetchCurrentWeather, fetchForecast, fetchUVIndex, fetchWeatherByCoords } from '../api/weatherApi';

const FAVORITES_KEY = 'weatherFavorites';

/** Own weather data, units, location permissions, and persisted favorite cities. */
export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [unit, setUnit] = useState('celsius');
  const [favorites, setFavorites] = useState([]);
  const [uvIndex, setUvIndex] = useState(null);
  const [lastSearched, setLastSearched] = useState(null);

  // Load favorites once on mount.
  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then((value) => { if (value) setFavorites(JSON.parse(value)); })
      .catch(() => {});
  }, []);

  // Persist favorites whenever they change.
  useEffect(() => {
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites]);

  const fetchWeather = useCallback(async (city) => {
    if (!city?.trim()) { setError('Enter a city name to search.'); return; }
    setLoading(true); setError(null); setLocationDenied(false);
    try {
      const [weather, forecast] = await Promise.all([
        fetchCurrentWeather(city.trim()),
        fetchForecast(city.trim()),
      ]);
      setWeatherData(weather); setForecastData(forecast); setLastSearched(weather.name);
      setUvIndex(weather.coord ? await fetchUVIndex(weather.coord.lat, weather.coord.lon) : null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); setRefreshing(false); }
  }, []);

  const fetchWeatherByLocation = useCallback(async () => {
    setLoading(true); setError(null); setLocationDenied(false);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        setLocationDenied(true);
        setError('Location permission is off. Allow access in Settings, or search for a city.');
        return;
      }
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = position.coords;
      const weather = await fetchWeatherByCoords(latitude, longitude);
      const [forecast, uv] = await Promise.all([
        fetchForecast(weather.name),
        fetchUVIndex(latitude, longitude),
      ]);
      setWeatherData(weather); setForecastData(forecast); setUvIndex(uv); setLastSearched(weather.name);
    } catch (err) {
      setError(err.message || 'Unable to read your location. Search for a city instead.');
    } finally { setLoading(false); setRefreshing(false); }
  }, []);

  // Functional updater form: safe from stale closures and fast successive taps.
  const addFavorite = useCallback((city) => {
    setFavorites((prev) => (prev.includes(city) ? prev : [...prev, city]));
  }, []);

  const removeFavorite = useCallback((city) => {
    setFavorites((prev) => prev.filter((item) => item !== city));
  }, []);

  const toggleUnit = useCallback(() => setUnit((value) => (value === 'celsius' ? 'fahrenheit' : 'celsius')), []);
  const convertTemperature = useCallback(
    (value) => (value == null ? '--' : Math.round(unit === 'fahrenheit' ? value * 9 / 5 + 32 : value)),
    [unit],
  );
  const convertWindSpeed = useCallback(
    (value) => Math.round(unit === 'fahrenheit' ? value * 2.237 : value),
    [unit],
  );
  const onRefresh = useCallback(() => {
    if (!lastSearched) return;
    setRefreshing(true);
    fetchWeather(lastSearched);
  }, [fetchWeather, lastSearched]);
  const openLocationSettings = useCallback(() => Linking.openSettings(), []);

  return {
    weatherData, forecastData, loading, refreshing, error, setError,
    fetchWeather, fetchWeatherByLocation, onRefresh, openLocationSettings,
    locationDenied, unit, toggleUnit, convertTemperature, convertWindSpeed,
    getWindUnit: () => (unit === 'fahrenheit' ? 'mph' : 'm/s'),
    favorites, addFavorite, removeFavorite, isFavorite: (city) => favorites.includes(city),
    loadFavorite: fetchWeather, uvIndex, lastSearched,
  };
}