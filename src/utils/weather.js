/** Return a representative emoji for a weather condition. */
export function weatherEmoji(condition = '') {
  const value = condition.toLowerCase();
  if (value.includes('thunder')) return '⛈️';
  if (value.includes('snow')) return '❄️';
  if (value.includes('rain') || value.includes('drizzle')) return '🌧️';
  if (value.includes('cloud')) return '☁️';
  if (value.includes('clear')) return '☀️';
  if (value.includes('mist') || value.includes('fog')) return '🌫️';
  return '🌤️';
}

/** Choose a gradient palette from the current weather description. */
export function weatherGradient(condition = '') {
  const value = condition.toLowerCase();
  if (value.includes('rain') || value.includes('drizzle') || value.includes('thunder')) return ['#344f70', '#526d89'];
  if (value.includes('snow')) return ['#829eb5', '#c4d9e7'];
  if (value.includes('cloud')) return ['#526d89', '#9bb5c9'];
  if (value.includes('clear')) return ['#2276ad', '#62b9dc'];
  return ['#285c7b', '#70a7b3'];
}
