import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { useRestaurantStatus } from '../hooks/useRestaurantStatus';

const navItems = [
  ['/', 'layout.nav.home'],
  ['/pizzas', 'layout.nav.menu'],
  ['/contactos', 'layout.nav.contacts'],
  ['/encomenda', 'layout.nav.order'],
];

export default function Layout() {
  const { count } = useCart();
  const { authenticated } = useAdmin();
  const { language, languages, setLanguage, t } = useLanguage();
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
              <NavLink to={to} end={to === '/'} onClick={() => setOpen(false)}>{t(label)}</NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <label className="language-picker">
            <span>{t('layout.language')}</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t('layout.language')}>
              {languages.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
            </select>
          </label>
          <Link className="admin-login-link" to={authenticated ? '/admin' : '/admin/login'} aria-label={t('layout.adminArea')}>
            <span aria-hidden="true">♙</span>{authenticated ? t('layout.panel') : t('layout.admin')}
          </Link>
          <Link className="cart-link" to="/encomenda" aria-label={t('layout.cartAria', { count })}>
            <span className="cart-icon">⌁</span>
            <span>{t('layout.cart')}</span>
            <b>{count}</b>
          </Link>
        </div>
      </nav>

      {showClosedNotice && (
        <div className="closed-snackbar" role="status">
          <span>{t('layout.closedLabel')}</span>
          <p>{t('layout.closedNotice')}</p>
        </div>
      )}

      <main><Outlet /></main>

      <footer>
        <div className="footer-grid">
          <div>
            <p className="footer-brand-name">Sant' Orégano</p>
            <p className="footer-brand-desc" dangerouslySetInnerHTML={{ __html: t('layout.footerDesc') }} />
          </div>
          <div>
            <p className="footer-col-title">{t('layout.footerNav')}</p>
            <ul className="footer-links">
              {navItems.map(([to, label]) => <li key={to}><Link to={to}>{t(label)}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">{t('layout.footerContact')}</p>
            <div className="footer-contact-item"><span>📍</span><span>Praça Conde de Águeda<br />3750-109 Águeda</span></div>
            <div className="footer-contact-item"><span>📞</span><a href="tel:+351926965965">926 965 965</a></div>
          </div>
        </div>
        <div className="footer-bottom">{t('layout.copyright')}</div>
      </footer>
    </div>
  );
}
