import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import DondeEstoy from '@/components/DondeEstoy';

export default function ConfirmarScreen() {
  const { carrito, nota, confirmarPedido } = useAppContext();
  const total = carrito.reduce((sum, item) => sum + item.plato.precio * item.cantidad, 0);

  if (carrito.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.vacio}>No hay items en el carrito</Text>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumen del pedido</Text>

      <FlatList
        data={carrito}
        keyExtractor={(item) => item.plato.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nombre}>
              {item.plato.nombre} x{item.cantidad}
            </Text>
            <Text style={styles.precio}>${item.plato.precio * item.cantidad}</Text>
          </View>
        )}
      />

      {nota ? (
        <View style={styles.notaContainer}>
          <Text style={styles.notaLabel}>Nota:</Text>
          <Text style={styles.notaTexto}>{nota}</Text>
        </View>
      ) : null}

      <Text style={styles.total}>Total: ${total}</Text>

      <Pressable
        style={styles.boton}
        onPress={() => {
          const numero = confirmarPedido();
          router.replace(`/turno/${numero}` as any);
        }}>
        <Text style={styles.botonTexto}>✅ Confirmar</Text>
      </Pressable>

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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  vacio: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nombre: {
    fontSize: 16,
  },
  precio: {
    fontSize: 16,
    fontWeight: '600',
  },
  notaContainer: {
    backgroundColor: '#FFF8E1',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  notaLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notaTexto: {
    color: '#666',
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 20,
  },
  boton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
