import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contacts from './pages/Contacts';
import Order from './pages/Order';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Closed from './pages/Closed';
import { useRestaurantStatus } from './hooks/useRestaurantStatus';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname]);
  return null;
}

function OrderRoute({ children }) {
  const status = useRestaurantStatus();
  return status.open ? children : <Closed status={status} />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Home />} />
          <Route path="/pizzas" element={<Menu />} />
          <Route path="/pizzas.html" element={<Menu />} />
          <Route path="/contactos" element={<Contacts />} />
          <Route path="/contactos.html" element={<Contacts />} />
          <Route path="/encomenda" element={<OrderRoute><Order /></OrderRoute>} />
          <Route path="/encomenda.html" element={<OrderRoute><Order /></OrderRoute>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
