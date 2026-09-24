export class Cola<T> {
  #items: T[] = [];
  #frente: number = 0;

  encolar(item: T): void {
    this.#items.push(item);
  }

  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const item = this.#items[this.#frente];
    this.#frente++;
    if (this.#frente > this.#items.length / 2) {
      this.#items = this.#items.slice(this.#frente);
      this.#frente = 0;
    }
    return item;
  }

  frente(): T | undefined {
    if (this.vacia) return undefined;
    return this.#items[this.#frente];
  }

  get vacia(): boolean {
    return this.#frente >= this.#items.length;
  }

  get tamanio(): number {
    return this.#items.length - this.#frente;
  }

  aArray(): T[] {
    return this.#items.slice(this.#frente);
  }
}
