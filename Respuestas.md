# RESPUESTAS.md

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos
a) LIFO significa "Último en entrar, primero en salir". Corresponde a la pila. FIFO significa "Primero en entrar, primero en salir". Corresponde a la cola.
b) En la pila, los elementos entran y salen por el mismo extremo, llamado tope. En la cola, los elementos entran por un extremo (el final) y salen por el extremo opuesto (el frente).
c) Ejemplo de pila: una pila de platos para lavar (vida real), el historial de pantallas navegadas en una aplicación donde volvés atrás (aplicación móvil). Ejemplo de cola: la fila para pagar en el supermercado (vida real), las descargas en segundo plano pendientes (aplicación móvil).

### A2. Seguimiento de una pila

Paso a paso:
1. `push('Inicio')` → pila: `['Inicio']`
2. `push('Productos')` → pila: `['Inicio', 'Productos']`
3. `push('Detalle 3')` → pila: `['Inicio', 'Productos', 'Detalle 3']`
4. `pop()` → saca 'Detalle 3' → pila: `['Inicio', 'Productos']`
5. `push('Perfil')` → pila: `['Inicio', 'Productos', 'Perfil']`

Salidas:
- (1) `p.tope()` → `'Perfil'`
- (2) `p.pop()` → `'Perfil'` (lo saca de la pila)
- (3) `p.tope()` → `'Productos'`
- (4) `p.vacia` → `false`

Estado final (base a tope): `['Inicio', 'Productos']`

### A3. Seguimiento de una cola
(1) `c.frente()` → `'Beto'`
(2) `c.desencolar()` → `'Beto'`
(3) `c.vacia` → `false`

Estado final (frente a final): `['Caro', 'Dani']`

### A4. Análisis de la implementación
a) El `#` indica que una propiedad o método es privado. Evita el problema de que el estado interno se modifique directamente desde afuera de la clase.
b) El problema es que `array.shift()` debe reindexar todos los elementos restantes del arreglo, lo que es lento y costoso para colas muy grandes. Las colas serias lo solucionan usando punteros (índices) para el frente y el final sin eliminar los elementos del inicio del arreglo inmediatamente.
c) La pila usa `pop()` para sacar el último elemento, mientras que la cola usa `shift()` para sacar el primero. No pueden usar el mismo porque operan sobre extremos diferentes del arreglo.

### A5. Programación: una cola eficiente
```js
class ColaEficiente {
  #items = {};
  #frenteIndex = 0;
  #finalIndex = 0;

  encolar(x) {
    this.#items[this.#finalIndex] = x;
    this.#finalIndex++;
  }

  desencolar() {
    if (this.vacia) return undefined;
    const elemento = this.#items[this.#frenteIndex];
    delete this.#items[this.#frenteIndex];
    this.#frenteIndex++;
    return elemento;
  }

  frente() {
    if (this.vacia) return undefined;
    return this.#items[this.#frenteIndex];
  }

  get vacia() {
    return this.#frenteIndex === this.#finalIndex;
  }

  get tamanio() {
    return this.#finalIndex - this.#frenteIndex;
  }
}
```

### A6. Pila y cola dentro de Expo Router
a) La estructura es una pila. La pantalla que está en el tope de la pila es la visible. "Back" hace un pop a la pila, eliminando la pantalla actual y mostrando la anterior.
b) Expo Router usa una cola de navegación. Si el usuario toca dos enlaces rápido, las acciones se encolan y se procesan una por una para evitar estados inconsistentes.

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL
- src/app/(tabs)/index.tsx → /
- src/app/acerca.tsx → /acerca
- src/app/(tabs)/perfil.tsx → /perfil
- src/app/(tabs)/productos/index.tsx → /productos
- src/app/(tabs)/productos/[id].tsx → /productos/123
- src/app/docs/[...slug].tsx → /docs/a/b/c
- src/app/_layout.tsx → Define el diseño que envuelve a las rutas de esa carpeta.
- src/app/+not-found.tsx → Se muestra cuando el usuario visita una URL que no existe (error 404).
- src/app/Boton.tsx → Se convierte en una ruta de la aplicación porque su nombre empieza con mayúscula, lo cual es un problema si era solo un componente.

### B2. De la URL al archivo
- /categorias/bebidas → src/app/categorias/[categoria].tsx
- /buscar?q=mate&categoria=kiosco → src/app/buscar.tsx
- /ayuda/pagos/tarjeta y /ayuda/horarios → src/app/ayuda/[...slug].tsx
- /ayuda → src/app/ayuda.tsx o src/app/ayuda/index.tsx

### B3. Verdadero o falso
a) Falso. Las rutas se crean automáticamente al agregar archivos en la carpeta app.
b) Falso. Los archivos _layout.tsx son envolturas para otras pantallas, no pantallas visitables por sí mismos.
c) Verdadero.
d) Falso. Conviene usar npx expo install para instalar la versión compatible con el SDK de Expo actual.
e) Verdadero.
f) Verdadero.
g) Verdadero.
h) Verdadero.

## Parte C · Navegar: <Link>, router y la pila

### C1. Métodos de router
- router.push(href): Agrega una nueva pantalla al tope de la pila.
- router.navigate(href): Navega a la pantalla existente si está en la pila, o la agrega si no está.
- router.replace(href): Reemplaza la pantalla actual en el tope de la pila por una nueva.
- router.back(): Saca la pantalla actual del tope de la pila (vuelve atrás).
- router.dismissTo(href): Vuelve atrás en la pila hasta encontrar la pantalla indicada.
- router.dismissAll(): Saca todas las pantallas de la pila y vuelve a la primera.
- router.canGoBack(): Devuelve true si hay pantallas anteriores en la pila, false si no.
- router.setParams({...}): Actualiza los parámetros de la pantalla actual sin cambiar de pantalla ni alterar la pila.

### C2. Simulación de la pila
1. [ /productos, /productos/1 ]
2. [ /productos, /productos/1, /productos/2 ]
3. [ /productos, /productos/1, /productos/2, /productos/5 ]
4. [ /productos, /productos/1, /productos/2, /productos/5, /perfil ]
5. [ /productos, /productos/1, /productos/2, /productos/5, /buscar ]
6. [ /productos, /productos/1, /productos/2, /productos/5 ]
7. [ /productos ]
8. false

### C3. ¿Link o router?
a) `<Link>`. Es una navegación declarativa directa, ideal para moverse entre partes de la app al tocar.
b) `router`. Necesitamos navegar imperativamente desde una función o callback (luego de guardar o responder la API).
c) `router.back()`. Es una acción imperativa que debe cerrar algo actual.
d) `router.replace()`. Se debe navegar imperativamente y reemplazar el login en la pila para que el usuario no pueda volver a él.
e) `router.dismissTo()`. Permite volver saltando múltiples pantallas hacia atrás programáticamente.

### C4. Escribí el código
a) 
```tsx
<Link href={{ pathname: '/productos/[id]', params: { id: 8 } }}>Ver producto 8</Link>
```
b)
```tsx
<Link href="/perfil" push>Perfil</Link>
```
c)
```tsx
<Link href="/carrito" asChild>
  <Pressable>
    <Text>Ir al carrito</Text>
  </Pressable>
</Link>
```

### C5. Pensar
En la web permite abrir el enlace en otra pestaña, copiar la URL o ver hacia dónde lleva al pasar el mouse por encima. En móvil no hay barra de direcciones y estas ventajas se pierden, pero usar Link mantiene una estructura limpia, declarativa y soporta deep linking internamente.

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación
- Stack: Apila pantallas. Cambia empujando o sacando de la pila con animaciones deslizantes. Se importa de `expo-router`. Uso típico: flujo de navegación con detalle (ej. lista a detalle de producto).
- Tabs: No apila, mantiene las pantallas activas paralelamente. Cambia mediante una barra inferior de pestañas. En SDK 57 se importa de `expo-router` o `expo-router/js-tabs`. Uso típico: navegación principal de la app entre secciones raíz.
- Drawer: No apila, es un menú lateral. Cambia al seleccionar en el menú deslizable. Se importa de `expo-router/drawer`. Uso típico: menús con muchas opciones o secciones secundarias.

### D2. Cada tab tiene su pila
Ve la pantalla del detalle del producto 4. Porque cada pestaña mantiene su propia pila de navegación intacta cuando cambiás a otra pestaña y luego volvés. La aplicación de Instagram o YouTube se comporta de esta forma.

### D3. ¿Dónde va cada pantalla?
a) Dentro del Stack que corresponde a esa pestaña en Tabs.
b) En un Stack raíz, por fuera de Tabs, con presentación modal.
c) En un Stack raíz, por fuera de Tabs, con presentación modal.
d) Dentro de la pila de la sección Perfil.

### D4. Configurar el Stack
a) `screenOptions` aplica las mismas opciones a todas las pantallas del Stack, mientras que `options` en `Stack.Screen` aplica solo a esa pantalla en particular.
b) Para evitar que aparezca un encabezado doble: el del Stack raíz y el del Tabs interior.
c) Sí existe. Se declara para poder configurarle opciones específicas como el título o presentación, aunque Expo Router la encuentre automáticamente.
d) modal, formSheet, transparentModal, fullScreenModal. Para bottom sheet al 50%: formSheet.
e) Usando el componente `<Stack.Screen options={{ title: 'Producto 7' }} />` dentro de la propia pantalla de detalle.

### D5. Tabs y Drawer en SDK 57
a) Tabs se importa de `expo-router` o `expo-router/js-tabs` (para tabs JS). La alternativa experimental son los tabs nativos desde `expo-router/native-tabs`.
b) Necesita `react-native-reanimated`, `react-native-worklets` y `react-native-gesture-handler`. Se debe poner el componente `GestureHandlerRootView` en el layout raíz para los gestos.
c) No es necesario, porque ya viene empaquetado (bundled) directamente en el SDK 57.
d) Actúa sobre el navegador más interno en el que se encuentre.

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error
El id extraído de la URL mediante `useLocalSearchParams` siempre es de tipo string, pero en la comparación estricta `===` se está verificando contra un número, lo que siempre devuelve falso.
Corrección:
```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const producto = productos.find((p) => p.id === Number(id));
  if (Number(id) === 3) console.log('Es el chipá');
  if (!producto) return <Text>No existe el producto {id}</Text>;
  return <Text>{producto.nombre}</Text>;
}
```

### E2. Catch-all
- /docs/react → slug es `['react']`
- /docs/react/hooks/useState → slug es `['react', 'hooks', 'useState']`
- /docs → no coincide con `[...slug].tsx` directamente o el slug queda vacío. Mostrará la pantalla `docs/index.tsx` si existe.

### E3. Anatomía de una URL
a) Scheme: `rutasipf`. Path: `/buscar`. Search params: `q=mate` y `categoria=bebidas`.
b) Devuelve `{ q: 'mate', categoria: 'bebidas' }`.
c) No, los parámetros de búsqueda (query params) se pasan automáticamente en la URL, los corchetes son solo para rutas dinámicas en el path (segmentos de la ruta).
d) 1) Es más rápido y no genera animaciones de transición. 2) No agrega una nueva pantalla al historial (pila), permitiendo que un "back" vuelva antes de la búsqueda original.

### E4. ¿Dónde estoy?
Para /productos/3:
- usePathname(): `/productos/3`
- useSegments(): `['productos', '[id]']`
- useLocalSearchParams(): `{ id: '3' }`

Para /buscar?q=chipa:
- usePathname(): `/buscar`
- useSegments(): `['buscar']`
- useLocalSearchParams(): `{ q: 'chipa' }`

### E5. Local vs global
a) `useLocalSearchParams` devuelve parámetros solo de la ruta actual, mientras que `useGlobalSearchParams` devuelve parámetros acumulados de toda la URL global. El predeterminado que conviene usar es `useLocalSearchParams` porque aísla la pantalla de factores externos y componentes superiores.
b) `useFocusEffect` ejecuta código cada vez que la pantalla vuelve a tomar foco, útil en Tabs o Stack donde la pantalla no se desmontó. Ejemplo: recargar datos actualizados del usuario en la vista de perfil al volver a esa pestaña.
c) No es un error de Expo Router. La ruta `/productos/[id].tsx` captura cualquier valor para `id`. Es responsabilidad del desarrollador validar en la pantalla que exista ese producto y mostrar el contenido o un estado de error.

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect
a) Redirige al usuario automáticamente a "/productos" apenas renderiza el componente. Su equivalente en métodos de router es `router.replace('/productos')`.
b) Debe reemplazar porque si empuja (push), el usuario podría usar el botón de volver atrás y caería nuevamente en la pantalla que causó la redirección original, creando un ciclo del que no puede salir.

### F2. Stack.Protected
```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
```
a) Si `guard` es false, la pantalla se retira inmediatamente del Stack de forma silenciosa.
b) Porque al loguearse exitosamente, `conSesion` se vuelve true, lo que causa que la guarda del login (`!conSesion`) pase a ser false y Stack.Protected remueva la pantalla automáticamente.
c) Ocurre cuando se intenta navegar a una ruta que está protegida y desactivada en ese instante (ej. ir a "privado" sin tener sesión activa). Para evitarlo, se configura un anchor (`unstable_settings`) o se verifica el estado antes de redireccionar.
d) Centraliza la protección de rutas directamente en la estructura de navegación en el layout, y evita renderizados intermedios o saltos visuales que a veces ocurren al poner `<Redirect>` dentro de las pantallas.

### F3. 404, anchor y rutas tipadas
a) Sirve para mostrar la vista de error cuando el usuario visita una ruta que no se encuentra. Se define en `src/app/+not-found.tsx`.
b) Establece qué ruta debe renderizarse por debajo en la pila (como ancla) cuando se accede a la aplicación directamente mediante un deep link.
c) Aparecerá un error de compilación de TypeScript advirtiendo que la ruta no es válida debido al error tipográfico. Los tipos se generan automáticamente en el directorio `.expo/types`.

### F4. Deep links
- App instalada (own build): `comedoripf://menu/7`
- Expo Go en desarrollo: `exp://192.168.1.20:8081/--/menu/7`
- Web: `http://192.168.1.20:8081/menu/7` o `http://localhost:8081/menu/7`
El `/--/` indica a Expo Go dónde termina su URL principal de conexión y dónde empiezan la ruta y parámetros reales para tu app. El esquema custom no funciona en Expo Go porque la aplicación que se ejecuta es el contenedor Expo Go, cuyo esquema propio es `exp://`.

### F5. Errores comunes
a) `asChild` pasa las propiedades de enlace al componente hijo, pero si ese hijo no puede recibir refs o manejar un array de estilos, puede fallar (suele requerir forwardRef en componentes custom).
b) Cualquier archivo con letra mayúscula inicial en la carpeta `app/` se asume como una pantalla y crea una ruta. Los componentes reutilizables deben estar fuera de `app/` o empezar con `_`.
c) Al usar `router.push("/")` pone el Home encima del Login en la pila de historial. Al hacer back, retrocede al Login. Se debe usar `router.replace("/")`.
d) Porque `npm install` descargó la versión más reciente del paquete, que puede no ser compatible. Había que usar `npx expo install` que asegura descargar la versión validada para el SDK actual.