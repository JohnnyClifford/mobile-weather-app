import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../theme';

/** City search field. Fires search on submit or button tap. */
export default function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('');

  const submit = () => {
    const trimmed = city.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <View>
      <TextInput
        accessibilityLabel="Search city"
        placeholder="Search a city"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={submit}
        returnKeyType="search"
        style={styles.input}
      />
      <Pressable
        accessibilityRole="button"
        disabled={loading || !city.trim()}
        onPress={submit}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{loading ? 'Loading…' : 'Search weather'}</Text>
      </Pressable>
    </View>
  );
}