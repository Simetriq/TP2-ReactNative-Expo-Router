import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import DondeEstoy from '@/components/DondeEstoy';

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🍽️ Comedor IPF</Text>
      <Text style={styles.subtitulo}>¡Bienvenido! Pedí tu comida desde el celular</Text>

      <View style={styles.tarjetas}>
        <Link href="/menu" asChild>
          <Pressable style={styles.tarjeta}>
            <Ionicons name="restaurant" size={32} color="#2196F3" />
            <Text style={styles.tarjetaTexto}>Menú</Text>
          </Pressable>
        </Link>

        <Link href="/buscar" asChild>
          <Pressable style={styles.tarjeta}>
            <Ionicons name="search" size={32} color="#4CAF50" />
            <Text style={styles.tarjetaTexto}>Buscar</Text>
          </Pressable>
        </Link>

        <Link href="/ayuda" asChild>
          <Pressable style={styles.tarjeta}>
            <Ionicons name="help-circle" size={32} color="#FF9800" />
            <Text style={styles.tarjetaTexto}>Ayuda</Text>
          </Pressable>
        </Link>

        <Link href="/login" asChild>
          <Pressable style={styles.tarjeta}>
            <Ionicons name="lock-closed" size={32} color="#F44336" />
            <Text style={styles.tarjetaTexto}>Cocina</Text>
          </Pressable>
        </Link>
      </View>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  tarjetas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  tarjeta: {
    width: '42%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  tarjetaTexto: {
    fontSize: 16,
    fontWeight: '600',
  },
});
