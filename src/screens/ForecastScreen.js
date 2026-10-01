import { ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ForecastList from '../components/ForecastList';
import { styles } from '../theme';
import { weatherGradient } from '../utils/weather';

/** Show the selected city's five-day forecast. */
export default function ForecastScreen({ weather }) {
  const condition = weather.weatherData?.weather?.[0]?.main || '';
  return (
    <LinearGradient colors={weatherGradient(condition)} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titleOnDark}>
          Forecast{weather.lastSearched ? ` · ${weather.lastSearched}` : ''}
        </Text>
        <ForecastList
          data={weather.forecastData}
          unit={weather.unit}
          convertTemperature={weather.convertTemperature}
        />
      </ScrollView>
    </LinearGradient>
  );
}