import { View, Text, StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';
import DondeEstoy from '@/components/DondeEstoy';

export default function NotFoundScreen() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🚫</Text>
      <Text style={styles.titulo}>Página no encontrada</Text>
      <Text style={styles.url}>{pathname}</Text>
      <Link href="/" style={styles.link}>
        Volver al inicio
      </Link>
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  url: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'monospace',
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
});
