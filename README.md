# Mobile Weather App

Mobile Weather App ports the weather dashboard into an Expo and React Native app. It shows current conditions and a five-day forecast from OpenWeatherMap, with saved cities and mobile location and notification features.

## Features

- Current temperature, feels-like temperature, humidity, wind, pressure, visibility, and UV index when available
- Five-day forecast, Celsius/Fahrenheit conversion, and city search
- Weather-themed gradient backgrounds, weather icons, and animated card transitions
- Favorites stored on the device with AsyncStorage
- Foreground location permission request, location lookup, and a link to system settings when permission is denied
- Daily local forecast reminder scheduled with Expo Notifications
- Pull-to-refresh on the current weather tab
- Current Weather, Forecast, Favorites, and Settings tabs
- Error boundary and friendly API and permission errors

## Screenshots

Add screenshots here after running the app:

- Current weather: `screenshots/current-weather.png`
- Forecast: `screenshots/forecast.png`
- Favorites: `screenshots/favorites.png`
- Settings: `screenshots/settings.png`

## Requirements and installation

1. Install Node.js and npm, then clone this repository and enter its folder:

   ```sh
   git clone <repository-url>
   cd mobile-weather-app
   npm install
   ```

2. Create an OpenWeatherMap API key (see below).
3. Start Expo with the key available to the Expo config process:

   macOS/Linux:

   ```sh
   OPENWEATHER_API_KEY=your_api_key npx expo start
   ```

   PowerShell:

   ```powershell
   $env:OPENWEATHER_API_KEY="your_api_key"
   npx expo start
   ```

   Keep the Expo process running while using the app. The API key is read by `app.config.js` and exposed to the app through `expo-constants`; because a mobile client must call the weather service directly, the key is present in the client bundle. Restrict the key in the OpenWeatherMap dashboard and avoid committing it.

## OpenWeatherMap API key setup

1. Sign up at [OpenWeatherMap](https://openweathermap.org/) and create an API key.
2. Set `OPENWEATHER_API_KEY` in the shell used to start Expo, as shown above. Do not put it in a committed config file.
3. Restart Expo after changing the key so the app config reloads.
4. If requests return an authentication error, confirm the key is active and that the selected OpenWeatherMap plan provides the endpoints in use.

## Run on a device or emulator

- **Expo Go on a physical device:** install Expo Go, connect the phone and development computer to the same network, run `npx expo start`, then scan the QR code. Location and notification behavior depends on the platform and Expo Go version.
- **Android emulator:** install and launch an Android Virtual Device, then run `npx expo start` and press `a` in the terminal.
- **iOS simulator:** on macOS, install Xcode and an iOS simulator, run `npx expo start`, then press `i`.

## Project structure

```text
mobile-weather-app/
├── App.js
├── app.config.js
├── babel.config.js
├── src/
│   ├── api/weatherApi.js
│   ├── components/
│   │   ├── ErrorBoundary.js
│   │   ├── ForecastList.js
│   │   ├── SearchBar.js
│   │   └── WeatherCard.js
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   └── useWeather.js
│   ├── screens/
│   │   ├── CurrentWeatherScreen.js
│   │   ├── FavoritesScreen.js
│   │   ├── ForecastScreen.js
│   │   └── SettingsScreen.js
│   ├── theme.js
│   └── utils/weather.js
├── SUBMISSION.md
└── package.json
```

## Tech stack

| Technology | Purpose |
| --- | --- |
| React Native | Native mobile interface and platform primitives |
| Expo | App tooling, device APIs, and development workflow |
| React Navigation | Bottom tab navigation |
| OpenWeatherMap | Current weather and forecast data |
| AsyncStorage | On-device favorites persistence |
| Expo Location | Foreground location permission and coordinates |
| Expo Notifications | Scheduled daily local forecast reminder |
| Reanimated | Native-driven view transitions |
| Expo Linear Gradient | Weather-dependent screen backgrounds |
| React Native StyleSheet | Co-located and shared native styles |

## Challenges & Design Decisions

- **Why Expo:** Expo provides a consistent React Native workflow and maintained integrations for location, notifications, and gradients without requiring custom native setup for routine development.
- **Replacing Framer Motion:** The weather card uses Reanimated's entering transition. Remaining interactions use native `Pressable` feedback and state-driven layouts rather than web animation APIs.
- **Porting gradients:** Weather conditions select color stops passed to `expo-linear-gradient`, replacing CSS background gradients.
- **Particle performance:** The first mobile port omits continuously moving rain and snow particles. A large number of looping animations can consume battery and affect lower-end devices; the screen instead uses weather icons, colors, and a short card transition. If particles are added later, keep their count small and animate transforms/opacity on the UI thread.
- **API key handling:** Expo config passes the key through `expo-constants`. This avoids Vite's `.env` convention, but a key embedded in a mobile client is inspectable; restrict it and use a backend proxy for stronger secrecy.
