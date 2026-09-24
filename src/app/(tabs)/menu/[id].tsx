import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { platos } from '@/data/platos';
import { useAppContext } from '@/context/AppContext';
import DondeEstoy from '@/components/DondeEstoy';

export default function DetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useAppContext();
  const plato = platos.find((p) => p.id === Number(id));

  if (!plato) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No existe el plato con id {id}</Text>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: plato.nombre }} />
      <Text style={styles.nombre}>{plato.nombre}</Text>
      <Text style={styles.categoria}>{plato.categoria.toUpperCase()}</Text>
      <Text style={styles.descripcion}>{plato.descripcion}</Text>
      <Text style={styles.precio}>${plato.precio}</Text>

      <Pressable
        style={styles.boton}
        onPress={() => {
          agregarAlCarrito(plato);
          Alert.alert('Agregado', `${plato.nombre} se agregó al carrito`);
        }}>
        <Text style={styles.botonTexto}>Agregar al carrito</Text>
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
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoria: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 15,
  },
  descripcion: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  precio: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 30,
  },
  boton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 18,
    color: '#F44336',
    textAlign: 'center',
    marginTop: 50,
  },
});
