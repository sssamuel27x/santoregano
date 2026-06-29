import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { stuffedCrusts } from '../data/menu';
import { useMenu } from './MenuContext';
import { menuImage } from '../utils/menuImages';

const CartContext = createContext(null);
const roundCurrency = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

function readCart() {
  try {
    return JSON.parse(localStorage.getItem('santoregano-cart')) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);
  const { categories, ready: menuReady } = useMenu();
  const products = useMemo(() => new Map(
    categories.flatMap((category) => category.items).map((product) => [product.id, product]),
  ), [categories]);

  useEffect(() => {
    localStorage.setItem('santoregano-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!menuReady) return;
    setCart((current) => {
      let changed = false;
      const next = current.flatMap((item) => {
        if (item.configuration) {
          const {
            primaryId,
            secondaryId,
            sizeKey,
            crustId,
            primaryChoiceId,
            secondaryChoiceId,
          } = item.configuration;
          const primary = products.get(primaryId);
          const secondary = secondaryId ? products.get(secondaryId) : null;
          if (!primary?.sizes?.[sizeKey] || (secondaryId && !secondary?.sizes?.[sizeKey])) {
            changed = true;
            return [];
          }

          const primaryChoice = primary.choice?.options.find((option) => option.id === primaryChoiceId) || null;
          const secondaryChoice = secondary?.choice?.options.find((option) => option.id === secondaryChoiceId) || null;
          if ((primary.choice && !primaryChoice) || (secondary?.choice && !secondaryChoice)) {
            changed = true;
            return [];
          }

          const crust = stuffedCrusts.find((option) => option.id === crustId) || null;
          const flavorPrice = secondary
            ? (primary.sizes[sizeKey].price / 2) + (secondary.sizes[sizeKey].price / 2)
            : primary.sizes[sizeKey].price;
          const primaryName = `${primary.name}${primaryChoice ? ` (${primaryChoice.name})` : ''}`;
          const secondaryName = secondary
            ? `${secondary.name}${secondaryChoice ? ` (${secondaryChoice.name})` : ''}`
            : '';
          const refreshed = {
            ...item,
            name: secondary ? `½ ${primaryName} + ½ ${secondaryName}` : primaryName,
            size: primary.sizes[sizeKey].label,
            crust: crust?.name || null,
            price: roundCurrency(flavorPrice + (crust?.price || 0)),
            imageUrl: menuImage(primary),
          };
          if (
            refreshed.name !== item.name
            || refreshed.size !== item.size
            || refreshed.crust !== item.crust
            || refreshed.price !== item.price
            || refreshed.imageUrl !== item.imageUrl
          ) changed = true;
          return [refreshed];
        }

        const product = products.get(item.productId);
        if (!product || product.sizes) {
          changed = true;
          return [];
        }
        const choice = product.choice?.options.find((option) => option.id === item.choiceId) || null;
        if (product.choice && !choice) {
          changed = true;
          return [];
        }
        const refreshed = {
          ...item,
          name: `${product.name}${choice ? ` (${choice.name})` : ''}`,
          category: product.category,
          imageUrl: menuImage(product),
          price: product.price,
        };
        if (
          refreshed.name !== item.name
          || refreshed.category !== item.category
          || refreshed.imageUrl !== item.imageUrl
          || refreshed.price !== item.price
        ) changed = true;
        return [refreshed];
      });
      return changed ? next : current;
    });
  }, [menuReady, products]);

  const addItem = (product, size, choice = null) => {
    const selected = size && product.sizes ? product.sizes[size] : null;
    const id = [product.id, size, choice?.id].filter(Boolean).join('-');
    const item = {
      id,
      productId: product.id,
      name: `${product.name}${choice ? ` (${choice.name})` : ''}`,
      category: product.category,
      imageUrl: menuImage(product),
      size: selected?.label || null,
      price: selected?.price ?? product.price,
      choiceId: choice?.id || null,
    };
    setCart((current) => {
      const existing = current.find((entry) => entry.id === id);
      return existing
        ? current.map((entry) => entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry)
        : [...current, { ...item, quantity: 1 }];
    });
  };

  const addConfiguredPizza = ({
    product,
    size,
    secondFlavor,
    crust,
    primaryChoice,
    secondChoice,
    price,
  }) => {
    const selected = product.sizes[size];
    const configuredFlavors = [
      `${product.id}:${primaryChoice?.id || 'standard'}`,
      ...(secondFlavor ? [`${secondFlavor.id}:${secondChoice?.id || 'standard'}`] : []),
    ].sort();
    const id = `pizza-${configuredFlavors.join('+')}-${size}-${crust?.id || 'sem-rebordo'}`;
    const primaryName = `${product.name}${primaryChoice ? ` (${primaryChoice.name})` : ''}`;
    const secondName = secondFlavor
      ? `${secondFlavor.name}${secondChoice ? ` (${secondChoice.name})` : ''}`
      : '';
    const item = {
      id,
      productId: product.id,
      name: secondFlavor ? `½ ${primaryName} + ½ ${secondName}` : primaryName,
      category: 'pizza',
      imageUrl: menuImage(product),
      size: selected.label,
      crust: crust?.name || null,
      price,
      configuration: {
        primaryId: product.id,
        secondaryId: secondFlavor?.id || null,
        sizeKey: size,
        crustId: crust?.id || null,
        primaryChoiceId: primaryChoice?.id || null,
        secondaryChoiceId: secondChoice?.id || null,
      },
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
