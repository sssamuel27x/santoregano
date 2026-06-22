import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

const ADMIN_EMAIL = 'samuelmau2008@gmail.com';
const AdminContext = createContext(null);

const isAdmin = (user) => user?.email?.toLowerCase() === ADMIN_EMAIL;

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser && !isAdmin(currentUser)) {
      await signOut(auth);
      setUser(null);
    } else {
      setUser(currentUser);
    }
    setLoading(false);
  }), []);

  const value = useMemo(() => ({
    user,
    loading,
    authenticated: Boolean(user),
    async login() {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      if (!isAdmin(result.user)) {
        await signOut(auth);
        throw new Error('Esta conta Google não tem acesso ao painel.');
      }
      return result.user;
    },
    async logout() {
      await signOut(auth);
    },
  }), [loading, user]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used inside AdminProvider');
  return context;
}
