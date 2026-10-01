import { FlatList, Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, styles } from '../theme';

/** List saved cities with actions to load or remove each favorite. */
export default function FavoritesScreen({ weather }) {
  return (
    <LinearGradient colors={['#285c7b', '#70a7b3']} style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.titleOnDark}>Favorites</Text>
        <FlatList
          data={weather.favorites}
          keyExtractor={(city) => city}
          ListEmptyComponent={
            <Text style={styles.textOnDark}>
              Save a city with the star on its weather card.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={[styles.card, styles.row]}>
              <Pressable style={{ flex: 1 }} onPress={() => weather.loadFavorite(item)}>
                <Text style={{ color: colors.ink, fontSize: 18, fontWeight: '700' }}>
                  {item}{weather.lastSearched === item ? '  · Current' : ''}
                </Text>
              </Pressable>
              <Pressable
                accessibilityLabel={`Remove ${item}`}
                onPress={() => weather.removeFavorite(item)}
              >
                <Text style={{ color: colors.danger, fontSize: 22, padding: 6 }}>×</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
}