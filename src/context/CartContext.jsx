import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

function readCart() {
  try {
    return JSON.parse(localStorage.getItem('santoregano-cart')) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    localStorage.setItem('santoregano-cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (product, size) => {
    const selected = size && product.sizes ? product.sizes[size] : null;
    const id = size ? `${product.id}-${size}` : product.id;
    const item = {
      id,
      productId: product.id,
      name: product.name,
      category: product.category,
      emoji: product.emoji,
      size: selected?.label || null,
      price: selected?.price ?? product.price,
    };
    setCart((current) => {
      const existing = current.find((entry) => entry.id === id);
      return existing
        ? current.map((entry) => entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry)
        : [...current, { ...item, quantity: 1 }];
    });
  };

  const addConfiguredPizza = ({ product, size, secondFlavor, crust, price }) => {
    const selected = product.sizes[size];
    const flavorIds = secondFlavor ? [product.id, secondFlavor.id].sort() : [product.id];
    const id = `pizza-${flavorIds.join('+')}-${size}-${crust?.id || 'sem-rebordo'}`;
    const item = {
      id,
      productId: product.id,
      name: secondFlavor ? `½ ${product.name} + ½ ${secondFlavor.name}` : product.name,
      category: 'pizza',
      emoji: '🍕',
      size: selected.label,
      crust: crust?.name || null,
      price,
    };
    setCart((current) => {
      const existing = current.find((entry) => entry.id === id);
      return existing
        ? current.map((entry) => entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry)
        : [...current, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((current) => quantity <= 0
      ? current.filter((item) => item.id !== id)
      : current.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const removeItem = (id) => setCart((current) => current.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(() => ({ cart, addItem, addConfiguredPizza, updateQuantity, removeItem, clearCart, count, subtotal }), [cart, count, subtotal]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
