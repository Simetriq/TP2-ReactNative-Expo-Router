import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router, Link } from 'expo-router';
import { platos, categorias } from '@/data/platos';
import DondeEstoy from '@/components/DondeEstoy';

export default function BuscarScreen() {
  const { q = '', categoria = '' } = useLocalSearchParams<{ q?: string; categoria?: string }>();

  const resultados = platos.filter((p) => {
    const coincideTexto = !q || p.nombre.toLowerCase().includes(q.toLowerCase());
    const coincideCategoria = !categoria || p.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar platos..."
        value={q}
        onChangeText={(texto) => router.setParams({ q: texto })}
      />

      <View style={styles.filtros}>
        <Pressable
          style={[styles.filtro, !categoria && styles.filtroActivo]}
          onPress={() => router.setParams({ categoria: '' })}>
          <Text style={!categoria ? styles.filtroTextoActivo : styles.filtroTexto}>Todos</Text>
        </Pressable>
        {categorias.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.filtro, categoria === cat && styles.filtroActivo]}
            onPress={() => router.setParams({ categoria: cat })}>
            <Text style={categoria === cat ? styles.filtroTextoActivo : styles.filtroTexto}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/menu/${item.id}` as any} asChild>
            <Pressable style={styles.resultado}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.precio}>${item.precio}</Text>
            </Pressable>
          </Link>
        )}
        ListEmptyComponent={
          <Text style={styles.sinResultados}>No se encontraron platos</Text>
        }
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  filtro: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filtroActivo: {
    backgroundColor: '#2196F3',
  },
  filtroTexto: {
    color: '#333',
  },
  filtroTextoActivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nombre: {
    fontSize: 16,
  },
  precio: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  sinResultados: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
    fontSize: 16,
  },
});
