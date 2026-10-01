import { StyleSheet } from 'react-native';

export const colors = { ink: '#17324a', muted: '#627b8f', white: '#ffffff', card: 'rgba(255,255,255,0.94)', accent: '#126b83', danger: '#9c2f35' };
export const styles = StyleSheet.create({
  screen: { flex: 1 }, content: { padding: 20, paddingBottom: 34 }, title: { color: colors.ink, fontSize: 26, fontWeight: '800', marginBottom: 16 },
  card: { backgroundColor: colors.card, borderRadius: 22, padding: 18, marginBottom: 14 }, label: { color: colors.muted, fontSize: 13, marginBottom: 5 }, value: { color: colors.ink, fontSize: 20, fontWeight: '700' },
  button: { minHeight: 48, paddingHorizontal: 16, borderRadius: 14, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginTop: 10 }, buttonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  input: { minHeight: 50, backgroundColor: colors.white, borderRadius: 14, paddingHorizontal: 15, color: colors.ink, fontSize: 16, marginBottom: 10 }, row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, error: { color: colors.danger, backgroundColor: '#fff1f1', borderRadius: 12, padding: 12, marginBottom: 12 },
  titleOnDark: { color: colors.white, fontSize: 30, fontWeight: '800', marginBottom: 16 },
  textOnDark: { color: colors.white },
});
