import { Drawer } from 'expo-router/drawer';

export default function CocinaLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="cocina"
        options={{ drawerLabel: 'Pedidos', title: 'Cocina' }}
      />
      <Drawer.Screen
        name="atendidos"
        options={{ drawerLabel: 'Atendidos', title: 'Pedidos Atendidos' }}
      />
    </Drawer>
  );
}
