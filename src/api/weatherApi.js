import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.openWeatherApiKey;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function request(path) {
  if (!API_KEY) throw new Error('OpenWeatherMap API key is missing. See README setup instructions.');
  const response = await fetch(`${BASE_URL}${path}${path.includes('?') ? '&' : '?'}appid=${API_KEY}`);
  if (!response.ok) {
    if (response.status === 401) throw new Error('Invalid OpenWeatherMap API key.');
    if (response.status === 404) throw new Error('City not found. Check the spelling and try again.');
    if (response.status === 429) throw new Error('Weather service limit reached. Please try again shortly.');
    throw new Error(`Weather request failed (${response.status}).`);
  }
  return response.json();
}

/** Fetch current conditions by city name. */
export const fetchCurrentWeather = (city) =>
  request(`/weather?q=${encodeURIComponent(city)}&units=metric`);

/** Fetch the five-day forecast by city name. */
export const fetchForecast = (city) =>
  request(`/forecast?q=${encodeURIComponent(city)}&units=metric`);

/** Fetch current conditions by coordinates. */
export const fetchWeatherByCoords = (lat, lon) =>
  request(`/weather?lat=${lat}&lon=${lon}&units=metric`);

/**
 * Fetch the UV index. This endpoint is not included in every OpenWeatherMap
 * plan, so a failure here is treated as "UV unavailable" rather than an error
 * for the whole screen.
 */
export async function fetchUVIndex(lat, lon) {
  try {
    const data = await request(`/uvi?lat=${lat}&lon=${lon}`);
    return data.value ?? null;
  } catch (err) {
    if (__DEV__) console.warn('UV index unavailable:', err.message);
    return null;
  }
}