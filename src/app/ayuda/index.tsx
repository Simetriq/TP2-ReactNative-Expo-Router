import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import DondeEstoy from '@/components/DondeEstoy';

const articulos = [
  { titulo: '¿Cómo pedir?', slug: 'como-pedir' },
  { titulo: 'Medios de pago', slug: 'pagos' },
  { titulo: 'Horarios', slug: 'horarios' },
  { titulo: 'Contacto', slug: 'contacto' },
];

export default function AyudaIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>❓ Centro de Ayuda</Text>

      {articulos.map((art) => (
        <Link key={art.slug} href={`/ayuda/${art.slug}` as any} asChild>
          <Pressable style={styles.item}>
            <Text style={styles.itemTexto}>{art.titulo}</Text>
            <Text style={styles.flecha}>→</Text>
          </Pressable>
        </Link>
      ))}

      <Link href="/ayuda/pagos/efectivo" asChild>
        <Pressable style={styles.item}>
          <Text style={styles.itemTexto}>Pago en efectivo</Text>
          <Text style={styles.flecha}>→</Text>
        </Pressable>
      </Link>

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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTexto: {
    fontSize: 16,
  },
  flecha: {
    fontSize: 18,
    color: '#999',
  },
});
