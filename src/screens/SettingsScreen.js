import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, styles } from '../theme';

/** Configure temperature units and a repeating daily forecast notification. */
export default function SettingsScreen({ weather }) {
  const [time, setTime] = useState('07:00');
  const [scheduled, setScheduled] = useState(false);

  const scheduleAlert = async () => {
    const match = time.match(/^(\d{1,2}):(\d{2})$/);
    if (!match || +match[1] > 23 || +match[2] > 59) {
      Alert.alert('Check the time', 'Enter a time in 24-hour HH:MM format.');
      return;
    }

    const permission = await Notifications.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Notifications are off',
        'Enable notifications in your device settings to schedule a daily alert.'
      );
      return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Tomorrow’s forecast',
        body: 'Open Mobile Weather to check the forecast.',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: Number(match[1]),
        minute: Number(match[2]),
      },
    });

    setScheduled(true);
    Alert.alert('Daily alert scheduled', `You’ll be reminded each day at ${time}.`);
  };

  const cancelAlert = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setScheduled(false);
  };

  return (
    <LinearGradient colors={['#285c7b', '#70a7b3']} style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.titleOnDark}>Settings</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Temperature units</Text>
          <Pressable onPress={weather.toggleUnit} style={styles.row}>
            <Text style={styles.value}>
              {weather.unit === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
            </Text>
            <Text style={{ color: colors.accent, fontWeight: '800' }}>Change</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Daily forecast alert</Text>
          <Text style={styles.label}>Choose a local time (24-hour clock)</Text>
          <TextInput
            accessibilityLabel="Notification time"
            value={time}
            onChangeText={setTime}
            keyboardType="numbers-and-punctuation"
            placeholder="07:00"
            style={styles.input}
          />
          <Pressable onPress={scheduleAlert} style={styles.button}>
            <Text style={styles.buttonText}>
              {scheduled ? 'Update daily alert' : 'Schedule daily alert'}
            </Text>
          </Pressable>
          {scheduled && (
            <Pressable onPress={cancelAlert} style={[styles.button, { backgroundColor: '#6b7d88' }]}>
              <Text style={styles.buttonText}>Cancel alert</Text>
            </Pressable>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}