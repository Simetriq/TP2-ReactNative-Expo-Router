import { Tabs } from 'expo-router/js-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppContext } from '@/context/AppContext';

export default function TabLayout() {
  const { carrito } = useAppContext();
  const cantidadItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#2196F3' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
          tabBarBadge: cantidadItems > 0 ? cantidadItems : undefined,
        }}
      />
    </Tabs>
  );
}
