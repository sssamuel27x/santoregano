import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { useRestaurantStatus } from '../hooks/useRestaurantStatus';

const navItems = [
  ['/', 'Início'],
  ['/pizzas', 'Menu'],
  ['/contactos', 'Contactos'],
  ['/encomenda', 'Encomendar'],
];

export default function Layout() {
  const { count } = useCart();
  const { authenticated } = useAdmin();
  const { pathname } = useLocation();
  const status = useRestaurantStatus();
  const [open, setOpen] = useState(false);
  const showClosedNotice = !status.open && !pathname.startsWith('/admin');

  return (
    <div className="site-shell">
      <nav className="site-nav">
        <Link className="nav-brand" to="/" onClick={() => setOpen(false)}>
          <span className="nav-brand-name">Sant' Orégano</span>
          <span className="nav-brand-sub">Pizzaria · Águeda</span>
        </Link>

        <button className="mobile-toggle" type="button" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>

        <ul className={`nav-links ${open ? 'nav-open' : ''}`}>
          {navItems.map(([to, label]) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link className="admin-login-link" to={authenticated ? '/admin' : '/admin/login'} aria-label="Área de administrador">
            <span aria-hidden="true">♙</span>{authenticated ? 'Painel' : 'Admin'}
          </Link>
          <Link className="cart-link" to="/encomenda" aria-label={`Carrinho com ${count} artigos`}>
            <span className="cart-icon">⌁</span>
            <span>Carrinho</span>
            <b>{count}</b>
          </Link>
        </div>
      </nav>

      {showClosedNotice && (
        <div className="closed-snackbar" role="status">
          <span>Encerrado agora</span>
          <p>Encomendas indisponíveis neste momento. O menu continua disponível para consulta.</p>
        </div>
      )}

      <main><Outlet /></main>

      <footer>
        <div className="footer-grid">
          <div>
            <p className="footer-brand-name">Sant' Orégano</p>
            <p className="footer-brand-desc">Pizzas assadas em forno a lenha<br />no coração de Águeda.</p>
          </div>
          <div>
            <p className="footer-col-title">Navegação</p>
            <ul className="footer-links">
              {navItems.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Contacto</p>
            <div className="footer-contact-item"><span>📍</span><span>Praça Conde de Águeda<br />3750-109 Águeda</span></div>
            <div className="footer-contact-item"><span>📞</span><a href="tel:+351926965965">926 965 965</a></div>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Sant' Orégano Pizzaria — Águeda, Portugal</div>
      </footer>
    </div>
  );
}
