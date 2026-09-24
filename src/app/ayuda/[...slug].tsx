import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DondeEstoy from '@/components/DondeEstoy';

const contenidos: Record<string, string> = {
  'como-pedir': 'Elegí tus platos del menú, agregalos al carrito y confirmá tu pedido. Recibirás un número de turno.',
  pagos: 'Aceptamos efectivo y transferencia. Pagás al retirar tu pedido en el mostrador.',
  'pagos/efectivo': 'Podés pagar en efectivo directamente en el mostrador al retirar tu pedido.',
  'pagos/tarjeta': 'Por el momento no aceptamos tarjeta de crédito ni débito.',
  horarios: 'El comedor está abierto de lunes a viernes de 7:00 a 14:00.',
  contacto: 'Escribinos a comedor@ipf.edu.ar o acercate al mostrador.',
};

export default function AyudaArticulo() {
  const { slug } = useLocalSearchParams<{ slug: string[] }>();
  const ruta = Array.isArray(slug) ? slug.join('/') : slug;
  const contenido = contenidos[ruta];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{ruta}</Text>
      {contenido ? (
        <Text style={styles.contenido}>{contenido}</Text>
      ) : (
        <Text style={styles.noEncontrado}>
          No se encontró el artículo de ayuda: {ruta}
        </Text>
      )}
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
    textTransform: 'capitalize',
  },
  contenido: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  noEncontrado: {
    fontSize: 16,
    color: '#F44336',
  },
});
