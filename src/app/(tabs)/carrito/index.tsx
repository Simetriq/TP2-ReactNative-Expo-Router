import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import DondeEstoy from '@/components/DondeEstoy';

export default function CarritoScreen() {
  const { carrito, deshacerUltimo, pilaDeshacer } = useAppContext();
  const total = carrito.reduce((sum, item) => sum + item.plato.precio * item.cantidad, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🛒 Mi Carrito</Text>

      {carrito.length === 0 ? (
        <Text style={styles.vacio}>El carrito está vacío</Text>
      ) : (
        <>
          <FlatList
            data={carrito}
            keyExtractor={(item) => item.plato.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View>
                  <Text style={styles.nombre}>{item.plato.nombre}</Text>
                  <Text style={styles.cantidad}>Cantidad: {item.cantidad}</Text>
                </View>
                <Text style={styles.precio}>${item.plato.precio * item.cantidad}</Text>
              </View>
            )}
          />

          <Text style={styles.total}>Total: ${total}</Text>

          <Link href="/carrito/nota" asChild>
            <Pressable style={styles.botonNota}>
              <Text style={styles.botonNotaTexto}>📝 Agregar nota para cocina</Text>
            </Pressable>
          </Link>

          <Pressable
            style={[styles.botonDeshacer, pilaDeshacer.vacia && styles.botonDeshabilitado]}
            disabled={pilaDeshacer.vacia}
            onPress={() => deshacerUltimo()}>
            <Text style={styles.botonDeshacerTexto}>↩ Deshacer último</Text>
          </Pressable>

          <Pressable
            style={styles.botonConfirmar}
            onPress={() => router.push('/confirmar')}>
            <Text style={styles.botonConfirmarTexto}>Confirmar pedido</Text>
          </Pressable>
        </>
      )}

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
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
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nombre: {
    fontSize: 16,
    fontWeight: '500',
  },
  cantidad: {
    fontSize: 14,
    color: '#666',
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 15,
    color: '#333',
  },
  botonNota: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    marginBottom: 10,
  },
  botonNotaTexto: {
    fontSize: 15,
    color: '#333',
  },
  botonDeshacer: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    marginBottom: 10,
  },
  botonDeshabilitado: {
    opacity: 0.4,
  },
  botonDeshacerTexto: {
    fontSize: 15,
    color: '#E65100',
    fontWeight: '600',
  },
  botonConfirmar: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  botonConfirmarTexto: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
