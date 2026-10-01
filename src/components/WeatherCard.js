import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, styles } from '../theme';
import { weatherEmoji } from '../utils/weather';

/** Display current conditions, favorite control, and expandable weather details. */
export default function WeatherCard({ data, unit, convertTemperature, convertWindSpeed, getWindUnit, isFavorite, onToggleFavorite, uvIndex }) {
  const [expanded, setExpanded] = useState(false);
  if (!data) return null;
  const unitLabel = unit === 'celsius' ? '°C' : '°F';
  const details = [
    ['Feels like', `${convertTemperature(data.main?.feels_like)}${unitLabel}`],
    ['Humidity', `${data.main?.humidity ?? '--'}%`], ['Wind', `${convertWindSpeed(data.wind?.speed ?? 0)} ${getWindUnit()}`],
    ['Pressure', `${data.main?.pressure ?? '--'} hPa`], ['Visibility', `${data.visibility ? (data.visibility / 1000).toFixed(1) : '--'} km`], ['UV index', uvIndex ?? '--'],
  ];
  return <Animated.View entering={FadeInDown.duration(400)} style={styles.card}>
    <View style={styles.row}>
      <View style={{ flex: 1 }}><Text style={styles.label}>Local weather</Text><Text style={styles.title}>{data.name}{data.sys?.country ? `, ${data.sys.country}` : ''}</Text><Text style={{ color: colors.muted, textTransform: 'capitalize' }}>{data.weather?.[0]?.description}</Text></View>
      <Pressable accessibilityRole="button" accessibilityLabel="Toggle favorite" onPress={() => onToggleFavorite(data.name)}><Text style={{ fontSize: 28 }}>{isFavorite(data.name) ? '⭐' : '☆'}</Text></Pressable>
    </View>
    <View style={{ alignItems: 'center', paddingVertical: 12 }}>
      {data.weather?.[0]?.icon ? <Image accessibilityLabel={data.weather[0].description} source={{ uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` }} style={{ width: 88, height: 88 }} /> : <Text style={{ fontSize: 55 }}>{weatherEmoji(data.weather?.[0]?.main)}</Text>}
      <Text style={{ color: colors.ink, fontSize: 58, fontWeight: '800' }}>{convertTemperature(data.main?.temp)}<Text style={{ fontSize: 26, color: colors.muted }}>{unitLabel}</Text></Text>
    </View>
    <Pressable accessibilityRole="button" onPress={() => setExpanded((value) => !value)}><Text style={{ color: colors.accent, textAlign: 'center', fontWeight: '700', padding: 8 }}>{expanded ? 'Hide details ▲' : 'Show details ▼'}</Text></Pressable>
    {expanded && <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderColor: '#e5edf1', paddingTop: 14 }}>{details.map(([label, value]) => <View key={label} style={{ width: '50%', paddingVertical: 9 }}><Text style={styles.label}>{label}</Text><Text style={{ color: colors.ink, fontWeight: '700' }}>{value}</Text></View>)}</View>}
  </Animated.View>;
}
