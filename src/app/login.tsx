import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import DondeEstoy from '@/components/DondeEstoy';

export default function LoginScreen() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const { iniciarSesion } = useAppContext();

  const handleLogin = () => {
    const ok = iniciarSesion(user, pass);
    if (!ok) {
      Alert.alert('Error', 'Usuario o contraseña incorrectos\n(usuario: cocina, clave: 1234)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🔐 Login Cocina</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={user}
        onChangeText={setUser}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />

      <Pressable style={styles.boton} onPress={handleLogin}>
        <Text style={styles.botonTexto}>Iniciar sesión</Text>
      </Pressable>

      <Text style={styles.pista}>Pista: cocina / 1234</Text>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  boton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pista: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 13,
  },
});
