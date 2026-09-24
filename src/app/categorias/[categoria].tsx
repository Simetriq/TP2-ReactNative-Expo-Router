import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { platos, categorias, Categoria } from '@/data/platos';
import { useAppContext } from '@/context/AppContext';
import DondeEstoy from '@/components/DondeEstoy';

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  const { agregarAlCarrito } = useAppContext();

  if (!categorias.includes(categoria as Categoria)) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>La categoría "{categoria}" no existe</Text>
        <DondeEstoy />
      </View>
    );
  }

  const platosCategoria = platos.filter((p) => p.categoria === categoria);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {(categoria as string).charAt(0).toUpperCase() + (categoria as string).slice(1)}
      </Text>
      <FlatList
        data={platosCategoria}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Link href={`/menu/${item.id}` as any} asChild>
              <Pressable style={styles.info}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.descripcion}>{item.descripcion}</Text>
                <Text style={styles.precio}>${item.precio}</Text>
              </Pressable>
            </Link>
            <Pressable
              style={styles.botonAgregar}
              onPress={() => agregarAlCarrito(item)}>
              <Text style={styles.botonTexto}>+</Text>
            </Pressable>
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
    padding: 15,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
  },
  descripcion: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  precio: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  botonAgregar: {
    backgroundColor: '#2196F3',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 18,
    color: '#F44336',
    textAlign: 'center',
    marginTop: 50,
  },
});
