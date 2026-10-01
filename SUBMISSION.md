# Assignment Submission Notes

## Project

- **Name:** Mobile Weather App
- **Repository:** To be added after the new GitHub repository is created
- **Date:** September 25, 2026

## Implemented features

- Current conditions and a five-day forecast using the OpenWeatherMap API
- Celsius/Fahrenheit conversion
- City search and saved favorites persisted with AsyncStorage
- Current location through Expo Location, including denied-permission guidance and a system settings shortcut
- Daily local forecast reminder through Expo Notifications
- Pull-to-refresh, four bottom tabs, weather-aware gradients, and Reanimated card entrance
- Friendly API errors and a React error boundary

## Design notes

The app uses Expo to access mobile capabilities while keeping the project in JavaScript. Framer Motion and CSS were replaced with Reanimated, React Native StyleSheet, and Expo Linear Gradient. Continuous weather particle effects were left out of this first mobile version to limit battery and animation load; short transitions and weather icons keep the interface responsive.

The OpenWeatherMap key is injected at Expo config time via `OPENWEATHER_API_KEY`. Since a direct mobile API request exposes its key in the client bundle, restrict the key and consider a backend proxy for production.

## Screenshots

Add screenshots from a physical device or emulator after reviewing the finished app.

## Remaining review items

- Add repository URL after GitHub setup
- Add screenshots
- Confirm API plan access for the requested current, forecast, and UV endpoints
