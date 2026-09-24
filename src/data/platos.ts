export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export interface Plato {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
}

export const platos: Plato[] = [
  { id: 1, nombre: 'Medialunas', precio: 1500, descripcion: 'Medialunas de manteca x3', categoria: 'desayuno' },
  { id: 2, nombre: 'Tostadas con mermelada', precio: 1200, descripcion: 'Tostadas de pan lactal con mermelada de frutilla', categoria: 'desayuno' },
  { id: 3, nombre: 'Chipá', precio: 800, descripcion: 'Chipá casero de almidón de mandioca', categoria: 'desayuno' },
  { id: 4, nombre: 'Milanesa con puré', precio: 3500, descripcion: 'Milanesa de carne con puré de papas', categoria: 'almuerzo' },
  { id: 5, nombre: 'Empanadas x3', precio: 2500, descripcion: 'Empanadas de carne cortada a cuchillo', categoria: 'almuerzo' },
  { id: 6, nombre: 'Guiso de lentejas', precio: 2800, descripcion: 'Guiso casero de lentejas con chorizo', categoria: 'almuerzo' },
  { id: 7, nombre: 'Pollo al horno', precio: 3200, descripcion: 'Pollo al horno con papas', categoria: 'almuerzo' },
  { id: 8, nombre: 'Agua mineral', precio: 500, descripcion: 'Agua mineral sin gas 500ml', categoria: 'bebidas' },
  { id: 9, nombre: 'Gaseosa', precio: 800, descripcion: 'Gaseosa línea Coca-Cola 500ml', categoria: 'bebidas' },
  { id: 10, nombre: 'Jugo de naranja', precio: 700, descripcion: 'Jugo de naranja natural', categoria: 'bebidas' },
  { id: 11, nombre: 'Alfajor', precio: 600, descripcion: 'Alfajor de maicena', categoria: 'kiosco' },
  { id: 12, nombre: 'Galletitas', precio: 500, descripcion: 'Paquete de galletitas surtidas', categoria: 'kiosco' },
];

export const categorias: Categoria[] = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];
