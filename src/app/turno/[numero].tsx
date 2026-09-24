import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import DondeEstoy from '@/components/DondeEstoy';

export default function TurnoScreen() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { colaPedidos } = useAppContext();

  const pedidosEnCola = colaPedidos.aArray();
  const posicion = pedidosEnCola.findIndex((p) => p.numero === Number(numero));
  const pedidosAdelante = posicion >= 0 ? posicion : pedidosEnCola.length;
  const tiempoEstimado = pedidosAdelante * 3;

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🎫</Text>
      <Text style={styles.label}>Tu número de turno</Text>
      <Text style={styles.numero}>{numero}</Text>

      <View style={styles.info}>
        <Text style={styles.infoTexto}>
          Pedidos adelante: {pedidosAdelante}
        </Text>
        <Text style={styles.infoTexto}>
          Tiempo estimado: ~{tiempoEstimado} minutos
        </Text>
      </View>

      <Text style={styles.mensaje}>
        Te avisaremos cuando tu pedido esté listo
      </Text>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  numero: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#2196F3',
    marginVertical: 10,
  },
  info: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  infoTexto: {
    fontSize: 16,
    color: '#1565C0',
    marginVertical: 3,
  },
  mensaje: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
