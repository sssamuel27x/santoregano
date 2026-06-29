import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { categories as defaultCategories, MENU_VERSION } from '../data/menu';
import { db } from '../firebase';

const MenuContext = createContext(null);
const menuDocument = doc(db, 'menu', 'current');

const cloneDefaults = () => JSON.parse(JSON.stringify(defaultCategories));

const defaultsWithRemoteImages = (remoteCategories) => {
  const remoteProducts = new Map(
    (remoteCategories || []).flatMap((category) => category.items || [])
      .map((product) => [product.id, product]),
  );
  return cloneDefaults().map((category) => ({
    ...category,
    items: category.items.map((product) => {
      const remoteProduct = remoteProducts.get(product.id);
      return remoteProduct?.imageUrl
        ? { ...product, imageUrl: remoteProduct.imageUrl, imagePath: remoteProduct.imagePath }
        : product;
    }),
  }));
};

const isValidMenu = (value) => (
  Array.isArray(value) && value.every((category) => Array.isArray(category.items))
);

export function MenuProvider({ children }) {
  const [categories, setCategories] = useState(cloneDefaults);
  const [ready, setReady] = useState(false);
  const [remoteExists, setRemoteExists] = useState(false);
  const [syncError, setSyncError] = useState('');

  useEffect(() => onSnapshot(menuDocument, (snapshot) => {
    const remoteData = snapshot.data();
    const remoteCategories = remoteData?.categories;
    const currentRemoteMenu = snapshot.exists()
      && remoteData?.menuVersion === MENU_VERSION
      && isValidMenu(remoteCategories);
    setRemoteExists(currentRemoteMenu);
    setCategories(currentRemoteMenu ? remoteCategories : defaultsWithRemoteImages(remoteCategories));
    setSyncError('');
    setReady(true);
  }, () => {
    setSyncError('Não foi possível sincronizar o menu neste momento.');
    setReady(true);
  }), []);

  const saveCategories = useCallback(async (nextCategories) => {
    setCategories(nextCategories);
    try {
      await setDoc(menuDocument, {
        categories: nextCategories,
        menuVersion: MENU_VERSION,
        updatedAt: serverTimestamp(),
      });
      setRemoteExists(true);
      setSyncError('');
    } catch (error) {
      setSyncError('Não foi possível guardar as alterações.');
      throw error;
    }
  }, []);

  const ensureMenu = useCallback(async () => {
    if (!ready || remoteExists) return;
    await saveCategories(categories);
  }, [categories, ready, remoteExists, saveCategories]);

  const addProduct = useCallback((categoryId, product) => saveCategories(categories.map((category) => (
    category.id === categoryId
      ? { ...category, items: [...category.items, product] }
      : category
  ))), [categories, saveCategories]);

  const updateProduct = useCallback((categoryId, product) => saveCategories(categories.map((category) => (
    category.id === categoryId
      ? { ...category, items: category.items.map((item) => (item.id === product.id ? product : item)) }
      : category
  ))), [categories, saveCategories]);

  const deleteProduct = useCallback((categoryId, productId) => saveCategories(categories.map((category) => (
    category.id === categoryId
      ? { ...category, items: category.items.filter((item) => item.id !== productId) }
      : category
  ))), [categories, saveCategories]);

  const resetMenu = useCallback(() => saveCategories(cloneDefaults()), [saveCategories]);

  const value = useMemo(() => ({
    categories,
    ready,
    syncError,
    ensureMenu,
    addProduct,
    updateProduct,
    deleteProduct,
    resetMenu,
  }), [addProduct, categories, deleteProduct, ensureMenu, ready, resetMenu, syncError, updateProduct]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used inside MenuProvider');
  return context;
}
