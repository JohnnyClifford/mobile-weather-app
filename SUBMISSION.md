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

## Porting notes: web app → mobile app

The original project was built as a React 18 + Vite web app with Framer Motion
for animation and CSS for styling. This mobile version keeps the same overall
architecture — API layer, custom hooks, and state management — but swaps the
presentation layer for React Native primitives and adapts the navigation model
to match mobile conventions.

### Reused unchanged

- `weatherApi.js` — `fetch` works identically in React Native. The only change
  was sourcing the API key from Expo config instead of Vite's `.env`.
- `useDebounce.js` — no platform assumptions, ported as-is.
- The shape of `useWeather` — state fields, loading flags, error handling, and
  the coordinate-based lookup all transferred directly.

### Rewritten for mobile

- **All components** — `<div>` → `<View>`, `<p>` → `<Text>`, `<button>` →
  `<Pressable>`, `<input>` → `<TextInput>`.
- **Styling** — CSS files and class names replaced with `StyleSheet.create`
  and a shared `theme.js` module. Design tokens (`colors`, `titleOnDark`,
  `textOnDark`) replaced the inline color overrides that had accumulated in
  the web version.
- **Animations** — Framer Motion replaced with Reanimated. The weather card
  uses `FadeInDown` for its entrance.
- **Gradients** — CSS `linear-gradient` replaced with `expo-linear-gradient`,
  driven by a shared `weatherGradient()` helper so the Current Weather and
  Forecast tabs stay in sync.
- **Persistence** — `localStorage` replaced with `AsyncStorage` so favorites
  survive app restarts on iOS and Android.
- **Navigation** — the web app's single-page layout became a four-tab
  navigator, matching how mobile users expect to move between views.

### New capabilities only available on mobile

- **Native geolocation** via `expo-location`, including a proper permission
  prompt and a fallback that links to system settings when access is denied.
- **Scheduled local notifications** via `expo-notifications` — a daily
  forecast reminder at a time the user picks.
- **Pull-to-refresh** on the Current Weather screen, which feels more natural
  on a touch device than a refresh button.
- **Tab bar with icons** — a mobile-native navigation convention that carries
  more visual weight than the web app's header links.

### Deliberate omissions

- Continuous rain and snow particle animations from the web version were left
  out. On a phone, a loop of animated views can measurably affect battery life
  and frame rate on lower-end devices. Weather icons and gradient backgrounds
  carry the same visual signal without the cost.
- A web-specific "resize on window" behavior was irrelevant on mobile and
  dropped entirely.

## Design notes

The app uses Expo to access mobile capabilities while keeping the project in
JavaScript. The OpenWeatherMap key is injected at Expo config time via
`OPENWEATHER_API_KEY`. Since a direct mobile API request exposes its key in the
client bundle, the key should be restricted in the OpenWeatherMap dashboard,
and a backend proxy would be the correct long-term fix.

## Screenshots

Captured from Expo Go on iOS.

- `screenshots/current-weather.png`
- `screenshots/forecast.png`
- `screenshots/favorites.png`
- `screenshots/settings.png`

## Challenges faced

- Porting the web app's CSS gradients to React Native required
  `expo-linear-gradient` and moving the gradient colors into a utility function
  so both the Current Weather and Forecast tabs share them.
- Reanimated's API differs enough from Framer Motion that the card entrance
  transition had to be rewritten from scratch.
- Keeping the OpenWeatherMap key out of version control while still making it
  available to the mobile client required reading the key through
  `app.config.js` rather than a Vite-style `.env` file.
- React Navigation required restructuring how weather state flows through the
  app. The web app could pull from a single page-level hook; the mobile app
  creates the state once in `App.js` and passes it to each tab as a prop, so
  every screen sees the same data.

## Future enhancements

- Add camera integration for a "report the weather" feature
- Cache the last successful forecast for offline viewing
- Add home-screen widget support