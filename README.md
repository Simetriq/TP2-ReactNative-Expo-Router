# Comedor IPF - TP2 React Native y Expo Router

Este es el proyecto del Trabajo Práctico N° 2 sobre Expo Router, correspondiente al Comedor del Instituto Politécnico Formosa.

## Árbol de carpetas de `src/app` y navegadores

```text
src/app
│
├── _layout.tsx                 (Stack raíz con Stack.Protected)
├── +not-found.tsx              (Pantalla 404)
├── buscar.tsx                  (Pantalla)
├── confirmar.tsx               (Pantalla modal)
├── login.tsx                   (Pantalla modal - Protegida)
├── pedido.tsx                  (Redirección)
│
├── (tabs)                      (Tabs Navigator)
│   ├── _layout.tsx             (Layout del Tabs)
│   ├── index.tsx               (Pantalla Inicio)
│   ├── carrito
│   │   ├── _layout.tsx         (Stack)
│   │   ├── index.tsx           (Pantalla)
│   │   └── nota.tsx            (Pantalla)
│   └── menu
│       ├── _layout.tsx         (Stack)
│       ├── index.tsx           (Pantalla)
│       └── [id].tsx            (Pantalla dinámica)
│
├── (cocina)                    (Drawer Navigator - Protegida)
│   ├── _layout.tsx             (Layout del Drawer)
│   ├── cocina.tsx              (Pantalla)
│   └── atendidos.tsx           (Pantalla)
│
├── ayuda                       (Stack por defecto, heredado)
│   ├── index.tsx               (Pantalla)
│   └── [...slug].tsx           (Pantalla dinámica catch-all)
│
└── categorias
    └── [categoria].tsx         (Pantalla dinámica)
```

## Justificación de `replace` vs `push` en la confirmación

En la pantalla de confirmación (`/confirmar`), al finalizar el pedido, se utiliza `router.replace('/turno/[numero]')` en lugar de `router.push`. 

La razón es simple: si usáramos `push`, la pantalla de confirmación quedaría en la pila de historial debajo de la pantalla del turno. Si el usuario luego presionara el botón de "atrás" (back), volvería a la pantalla de confirmación de un pedido que ya fue procesado, generando confusión y posibles estados inválidos en la app. Al utilizar `replace`, sustituimos la pantalla actual (confirmación) por la nueva (turno) en el tope de la pila. Así, si el usuario vuelve atrás, retornará directamente a la pantalla anterior a la confirmación (el carrito o el inicio, según corresponda), lo cual es el comportamiento correcto y esperado.

## Capturas y Videos
*(Nota: Las capturas o videos se adjuntarían aquí en un escenario real)*
- Carrito con deshacer
- Turno
- Cocina atendiendo pedidos
- Login / Logout
- Pantalla 404

## Deep Link de prueba en Expo Go

Para abrir directamente el detalle del plato 7 usando Expo Go en el entorno de desarrollo (suponiendo que la IP sea 192.168.1.20 y el puerto 8081):

```text
exp://192.168.1.20:8081/--/menu/7
```

*(Asegurarse de reemplazar la IP por la IP correspondiente mostrada en la terminal al ejecutar `npx expo start`)*.
