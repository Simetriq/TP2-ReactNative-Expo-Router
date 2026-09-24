import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { platos, categorias } from '@/data/platos';
import DondeEstoy from '@/components/DondeEstoy';

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item}
        renderItem={({ item: categoria }) => (
          <View style={styles.seccion}>
            <Link href={`/categorias/${categoria}` as any} asChild>
              <Pressable>
                <Text style={styles.categoriaTitulo}>
                  {categoria.charAt(0).toUpperCase() + categoria.slice(1)} →
                </Text>
              </Pressable>
            </Link>
            {platos
              .filter((p) => p.categoria === categoria)
              .map((plato) => (
                <Link key={plato.id} href={`/menu/${plato.id}` as any} asChild>
                  <Pressable style={styles.platoItem}>
                    <Text style={styles.platoNombre}>{plato.nombre}</Text>
                    <Text style={styles.platoPrecio}>${plato.precio}</Text>
                  </Pressable>
                </Link>
              ))}
          </View>
        )}
        ListFooterComponent={<DondeEstoy />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  seccion: {
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  categoriaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  platoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  platoNombre: {
    fontSize: 16,
  },
  platoPrecio: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
});
