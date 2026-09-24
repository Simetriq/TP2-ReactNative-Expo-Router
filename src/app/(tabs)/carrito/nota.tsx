import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import DondeEstoy from '@/components/DondeEstoy';

export default function NotaScreen() {
  const { nota, setNota } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nota para la cocina</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: sin sal, sin picante..."
        value={nota}
        onChangeText={setNota}
        multiline
        numberOfLines={4}
      />
      <Pressable style={styles.boton} onPress={() => router.back()}>
        <Text style={styles.botonTexto}>Guardar nota</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
