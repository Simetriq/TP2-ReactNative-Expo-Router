import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import DondeEstoy from '@/components/DondeEstoy';

export default function AtendidosScreen() {
  const { pilaAtendidos } = useAppContext();
  const lista = pilaAtendidos.aArray().reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📋 Pedidos Atendidos</Text>

      {lista.length === 0 ? (
        <Text style={styles.vacio}>No hay pedidos atendidos aún</Text>
      ) : (
        <FlatList
          data={lista}
          keyExtractor={(item) => item.numero.toString()}
          renderItem={({ item }) => (
            <View style={styles.pedido}>
              <Text style={styles.pedidoNumero}>Pedido #{item.numero}</Text>
              {item.items.map((i) => (
                <Text key={i.plato.id} style={styles.itemTexto}>
                  • {i.plato.nombre} x{i.cantidad}
                </Text>
              ))}
              <Text style={styles.total}>Total: ${item.total}</Text>
            </View>
          )}
          ListFooterComponent={<DondeEstoy />}
        />
      )}
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
  pedido: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  pedidoNumero: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemTexto: {
    fontSize: 14,
    color: '#666',
    paddingVertical: 2,
  },
  total: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'right',
  },
});
