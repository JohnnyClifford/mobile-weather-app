/** Expo configuration; the API key is injected from the local shell environment. */
module.exports = ({ config }) => ({
  ...config,
  name: 'Mobile Weather App',
  slug: 'mobile-weather-app',
  plugins: ['expo-location', 'expo-notifications'],
  extra: {
    ...config.extra,
    openWeatherApiKey: process.env.OPENWEATHER_API_KEY || '',
  },
  ios: {
    ...config.ios,
    infoPlist: {
      ...config.ios?.infoPlist,
      NSLocationWhenInUseUsageDescription: 'Your location is used to show local weather.',
    },
  },
});
