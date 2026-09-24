import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import DondeEstoy from '@/components/DondeEstoy';

export default function CocinaScreen() {
  const { colaPedidos, atenderSiguiente, cerrarSesion } = useAppContext();
  const pedidoActual = colaPedidos.frente();
  const cantidadEnEspera = colaPedidos.tamanio;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👨‍🍳 Cocina</Text>
      <Text style={styles.enEspera}>Pedidos en espera: {cantidadEnEspera}</Text>

      {pedidoActual ? (
        <View style={styles.pedidoCard}>
          <Text style={styles.pedidoNumero}>Pedido #{pedidoActual.numero}</Text>
          <FlatList
            data={pedidoActual.items}
            keyExtractor={(item) => item.plato.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.itemTexto}>
                • {item.plato.nombre} x{item.cantidad}
              </Text>
            )}
          />
          {pedidoActual.nota ? (
            <Text style={styles.nota}>📝 {pedidoActual.nota}</Text>
          ) : null}
          <Text style={styles.pedidoTotal}>Total: ${pedidoActual.total}</Text>

          <Pressable style={styles.botonAtender} onPress={() => atenderSiguiente()}>
            <Text style={styles.botonTexto}>✅ Atender siguiente</Text>
          </Pressable>
        </View>
      ) : (
        <Text style={styles.sinPedidos}>No hay pedidos en la cola</Text>
      )}

      <Pressable style={styles.botonCerrar} onPress={cerrarSesion}>
        <Text style={styles.botonCerrarTexto}>Cerrar sesión</Text>
      </Pressable>

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
    marginBottom: 5,
  },
  enEspera: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  pedidoCard: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  pedidoNumero: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  itemTexto: {
    fontSize: 16,
    paddingVertical: 3,
  },
  nota: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#FFF8E1',
    borderRadius: 6,
    color: '#666',
  },
  pedidoTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
  botonAtender: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sinPedidos: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  botonCerrar: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    marginTop: 'auto',
  },
  botonCerrarTexto: {
    color: '#F44336',
    fontWeight: '600',
  },
});
