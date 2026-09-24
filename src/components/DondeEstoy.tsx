import { View, Text, StyleSheet } from 'react-native';
import { usePathname, useSegments, useLocalSearchParams } from 'expo-router';

const DEBUG = true;

export default function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Dónde estoy?</Text>
      <Text style={styles.text}>Ruta: {pathname}</Text>
      <Text style={styles.text}>Segmentos: {JSON.stringify(segments)}</Text>
      <Text style={styles.text}>Params: {JSON.stringify(params)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 12,
    color: '#666',
  },
  text: {
    fontSize: 11,
    color: '#888',
    fontFamily: 'monospace',
  },
});
