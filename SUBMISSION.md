# Assignment Submission Notes

## Project

- **Name:** Mobile Weather App
- **Repository:** https://github.com/JohnnyClifford/mobile-weather-app
- **Date:** October 2, 2026

## Implemented features

- Current conditions and a five-day forecast using the OpenWeatherMap API
- Celsius/Fahrenheit conversion
- City search and saved favorites persisted with AsyncStorage
- Current location through Expo Location, including denied-permission guidance and a system settings shortcut
- Daily local forecast reminder through Expo Notifications
- Pull-to-refresh, four bottom tabs with icons, weather-aware gradients, and Reanimated card entrance
- Friendly API errors and a React error boundary

## Design notes

The app uses Expo to access mobile capabilities while keeping the project in JavaScript. Framer Motion and CSS were replaced with Reanimated, React Native StyleSheet, and Expo Linear Gradient. Continuous weather particle effects were left out of this first mobile version to limit battery and animation load; short transitions and weather icons keep the interface responsive.

The OpenWeatherMap key is injected at Expo config time via `OPENWEATHER_API_KEY`. Since a direct mobile API request exposes its key in the client bundle, restrict the key and consider a backend proxy for production.

## Screenshots

Captured from Expo Go on iOS.

- `screenshots/current-weather.png`
- `screenshots/forecast.png`
- `screenshots/favorites.png`
- `screenshots/settings.png`

## Challenges faced

- Porting the web app's CSS gradients to React Native required `expo-linear-gradient` and moving the gradient colors into a utility function so both the Current Weather and Forecast tabs share them.
- Reanimated's API differs enough from Framer Motion that the card entrance transition had to be rewritten from scratch.
- Keeping the OpenWeatherMap key out of version control while still making it available to the mobile client required reading the key through `app.config.js` rather than a Vite-style `.env` file.

## Future enhancements

- Add camera integration for a "report the weather" feature
- Cache the last successful forecast for offline viewing
- Add home-screen widget support