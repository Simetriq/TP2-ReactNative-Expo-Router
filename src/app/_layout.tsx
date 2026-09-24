import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider, useAppContext } from '@/context/AppContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNav() {
  const { usuario } = useAppContext();
  const conSesion = usuario !== null;

  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Stack.Screen name="confirmar" options={{ presentation: 'modal', title: 'Confirmar Pedido' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Tu Turno' }} />
      <Stack.Screen name="ayuda/index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="ayuda/[...slug]" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="pedido" options={{ headerShown: false }} />
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal', title: 'Login Cocina' }} />
      </Stack.Protected>
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="(cocina)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Screen name="+not-found" options={{ title: '404' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <RootNav />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
