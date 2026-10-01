import { FlatList, Image, Text, View } from 'react-native';
import { colors, styles } from '../theme';
import { weatherEmoji } from '../utils/weather';

/** Render up to five daily forecast entries with FlatList virtualization. */
export default function ForecastList({ data, unit, convertTemperature }) {
  const entries = (data?.list || []).filter((item) => item.dt_txt?.includes('12:00:00')).slice(0, 5);
  return <View style={styles.card}>
    <Text style={styles.title}>5-day forecast</Text>
    {!entries.length ? <Text style={{ color: colors.muted }}>Search for a city to see its forecast.</Text> : <FlatList data={entries} keyExtractor={(item) => String(item.dt)} scrollEnabled={false} renderItem={({ item }) => {
      const date = new Date(item.dt * 1000);
      return <View style={[styles.row, { paddingVertical: 10, borderTopWidth: 1, borderColor: '#e5edf1' }]}>
        <Text style={{ color: colors.ink, width: 90, fontWeight: '600' }}>{date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</Text>
        {item.weather?.[0]?.icon ? <Image source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` }} style={{ width: 42, height: 42 }} /> : <Text style={{ fontSize: 25 }}>{weatherEmoji(item.weather?.[0]?.main)}</Text>}
        <Text style={{ flex: 1, color: colors.muted, textAlign: 'center' }}>{item.weather?.[0]?.main || 'Weather'}</Text>
        <Text style={{ color: colors.ink, fontWeight: '800' }}>{convertTemperature(item.main?.temp)}°{unit === 'celsius' ? 'C' : 'F'}</Text>
      </View>;
    }} />}
  </View>;
}
