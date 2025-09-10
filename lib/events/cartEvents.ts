type CartListener = (data: any) => void;

class CartEvents {
  private listeners: CartListener[] = [];

  subscribe(listener: CartListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  emit(data: any) {
    this.listeners.forEach((listener) => listener(data));
  }
}

export const cartEvents = new CartEvents();
