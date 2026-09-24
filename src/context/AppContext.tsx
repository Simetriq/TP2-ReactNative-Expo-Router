import React, { createContext, useContext, useState, useCallback } from 'react';
import { Pila } from '@/estructuras/Pila';
import { Cola } from '@/estructuras/Cola';
import { Plato } from '@/data/platos';

export interface ItemCarrito {
  plato: Plato;
  cantidad: number;
}

export interface Pedido {
  numero: number;
  items: ItemCarrito[];
  total: number;
  nota: string;
  fecha: Date;
}

interface AppContextType {
  usuario: string | null;
  iniciarSesion: (user: string, pass: string) => boolean;
  cerrarSesion: () => void;

  carrito: ItemCarrito[];
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => Plato | undefined;
  limpiarCarrito: () => void;
  pilaDeshacer: Pila<Plato>;
  nota: string;
  setNota: (nota: string) => void;

  colaPedidos: Cola<Pedido>;
  confirmarPedido: () => number;
  atenderSiguiente: () => Pedido | undefined;
  pilaAtendidos: Pila<Pedido>;
  contadorPedidos: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext debe usarse dentro de AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [pilaDeshacer] = useState(() => new Pila<Plato>());
  const [colaPedidos] = useState(() => new Cola<Pedido>());
  const [pilaAtendidos] = useState(() => new Pila<Pedido>());
  const [contadorPedidos, setContadorPedidos] = useState(0);
  const [nota, setNota] = useState('');
  const [, forceUpdate] = useState(0);

  const refresh = useCallback(() => forceUpdate(n => n + 1), []);

  const iniciarSesion = useCallback((user: string, pass: string) => {
    if (user === 'cocina' && pass === '1234') {
      setUsuario(user);
      return true;
    }
    return false;
  }, []);

  const cerrarSesion = useCallback(() => {
    setUsuario(null);
  }, []);

  const agregarAlCarrito = useCallback((plato: Plato) => {
    pilaDeshacer.push(plato);
    setCarrito(prev => {
      const existente = prev.find(item => item.plato.id === plato.id);
      if (existente) {
        return prev.map(item =>
          item.plato.id === plato.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { plato, cantidad: 1 }];
    });
  }, [pilaDeshacer]);

  const deshacerUltimo = useCallback(() => {
    const plato = pilaDeshacer.pop();
    if (!plato) return undefined;
    setCarrito(prev => {
      const existente = prev.find(item => item.plato.id === plato.id);
      if (existente && existente.cantidad > 1) {
        return prev.map(item =>
          item.plato.id === plato.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        );
      }
      return prev.filter(item => item.plato.id !== plato.id);
    });
    return plato;
  }, [pilaDeshacer]);

  const limpiarCarrito = useCallback(() => {
    setCarrito([]);
    while (!pilaDeshacer.vacia) pilaDeshacer.pop();
  }, [pilaDeshacer]);

  const confirmarPedido = useCallback(() => {
    const numero = contadorPedidos + 1;
    setContadorPedidos(numero);
    const total = carrito.reduce((sum, item) => sum + item.plato.precio * item.cantidad, 0);
    const pedido: Pedido = {
      numero,
      items: [...carrito],
      total,
      nota,
      fecha: new Date(),
    };
    colaPedidos.encolar(pedido);
    setCarrito([]);
    setNota('');
    while (!pilaDeshacer.vacia) pilaDeshacer.pop();
    refresh();
    return numero;
  }, [carrito, nota, contadorPedidos, colaPedidos, pilaDeshacer, refresh]);

  const atenderSiguiente = useCallback(() => {
    const pedido = colaPedidos.desencolar();
    if (pedido) {
      pilaAtendidos.push(pedido);
      refresh();
    }
    return pedido;
  }, [colaPedidos, pilaAtendidos, refresh]);

  return (
    <AppContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
        carrito,
        agregarAlCarrito,
        deshacerUltimo,
        limpiarCarrito,
        pilaDeshacer,
        nota,
        setNota,
        colaPedidos,
        confirmarPedido,
        atenderSiguiente,
        pilaAtendidos,
        contadorPedidos,
      }}>
      {children}
    </AppContext.Provider>
  );
}
