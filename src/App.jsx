import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contacts from './pages/Contacts';
import Order from './pages/Order';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Closed from './pages/Closed';
import { getRestaurantStatus } from './utils/openingHours';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname]);
  return null;
}

function PublicRoute({ children }) {
  const [status, setStatus] = useState(() => getRestaurantStatus());

  useEffect(() => {
    const updateStatus = () => setStatus(getRestaurantStatus());
    const interval = window.setInterval(updateStatus, 30 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  return status.open ? children : <Closed status={status} />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/index.html" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/pizzas" element={<PublicRoute><Menu /></PublicRoute>} />
          <Route path="/pizzas.html" element={<PublicRoute><Menu /></PublicRoute>} />
          <Route path="/contactos" element={<PublicRoute><Contacts /></PublicRoute>} />
          <Route path="/contactos.html" element={<PublicRoute><Contacts /></PublicRoute>} />
          <Route path="/encomenda" element={<PublicRoute><Order /></PublicRoute>} />
          <Route path="/encomenda.html" element={<PublicRoute><Order /></PublicRoute>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<PublicRoute><Home /></PublicRoute>} />
        </Route>
      </Routes>
    </>
  );
}
