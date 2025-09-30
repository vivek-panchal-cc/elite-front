type CartSummaryListener = (data: any) => void;

class CartSummaryEvents {
  private listeners: CartSummaryListener[] = [];

  subscribe(listener: CartSummaryListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  emit(data: any) {
    this.listeners.forEach((listener) => listener(data));
  }
}

export const cartSummaryEvents = new CartSummaryEvents();
