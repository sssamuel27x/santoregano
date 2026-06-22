import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { euro } from '../data/menu';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';

const stuffedCrusts = [
  { id: 'catupiry', name: 'Catupiry', price: 6 },
  { id: 'mozzarella', name: 'Mozzarella', price: 5 },
  { id: 'cream-cheese', name: 'Cream Cheese', price: 8 },
  { id: 'brigadeiro', name: 'Brigadeiro', price: 6 },
];

const roundCurrency = (value) => Math.round((value + Number.EPSILON) * 100) / 100;
const menuImageAliases = {
  'agua-15': 'agua-500',
  frize: 'pedras',
  'coca-zero': 'coca',
  'coca-1l': 'coca-vidro',
  'cerveja-330': 'cerveja-mini',
  carlsberg: 'cerveja-mini',
  heineken: 'cerveja-mini',
};
const menuImage = (product) => `/menu-images/${menuImageAliases[product.id] || product.id}.jpg`;

function PizzaConfigurator({ product, size, pizzas, onClose, onAdded }) {
  const { addConfiguredPizza } = useCart();
  const [halfAndHalf, setHalfAndHalf] = useState(false);
  const [secondId, setSecondId] = useState('');
  const [crustId, setCrustId] = useState('');
  const secondFlavor = pizzas.find((pizza) => pizza.id === secondId) || null;
  const crust = stuffedCrusts.find((item) => item.id === crustId) || null;
  const sizeInfo = product.sizes[size];
  const flavorPrice = secondFlavor
    ? (sizeInfo.price / 2) + (secondFlavor.sizes[size].price / 2)
    : sizeInfo.price;
  const total = roundCurrency(flavorPrice + (crust?.price || 0));

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => event.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  const addPizza = () => {
    if (halfAndHalf && !secondFlavor) return;
    addConfiguredPizza({ product, size, secondFlavor: halfAndHalf ? secondFlavor : null, crust, price: total });
    onAdded(halfAndHalf && secondFlavor ? `${product.name} + ${secondFlavor.name}` : product.name);
    onClose();
  };

  return (
    <div className="pizza-config-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="pizza-config" role="dialog" aria-modal="true" aria-labelledby="pizza-config-title">
        <header className="pizza-config-header">
          <div className="pizza-config-hero" aria-hidden="true">
            <span>{product.emoji}</span>
            <img src={menuImage(product)} alt="" onError={(event) => { event.currentTarget.hidden = true; }} />
          </div>
          <div>
            <p className="eyebrow">Personalize a sua pizza</p>
            <h2 id="pizza-config-title">{product.name}</h2>
            <p>{product.ingredients}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar personalização">×</button>
        </header>

        <div className="pizza-config-body">
          <section className="pizza-config-block">
            <div className="pizza-config-block-title"><span>01</span><div><h3>Tamanho</h3><p>Selecionado no menu</p></div></div>
            <div className="pizza-selected-size"><b>{sizeInfo.label}</b><span>{euro(sizeInfo.price)}</span></div>
          </section>

          <section className="pizza-config-block">
            <div className="pizza-config-block-title"><span>02</span><div><h3>Sabores</h3><p>Escolha pizza inteira ou dois sabores</p></div></div>
            <div className="pizza-flavor-mode">
              <button className={!halfAndHalf ? 'selected' : ''} type="button" onClick={() => { setHalfAndHalf(false); setSecondId(''); }}>
                <span>●</span><b>Pizza inteira</b><small>{product.name}</small>
              </button>
              <button className={halfAndHalf ? 'selected' : ''} type="button" onClick={() => setHalfAndHalf(true)}>
                <span>◐</span><b>Meia + meia</b><small>Combine dois sabores</small>
              </button>
            </div>
            {halfAndHalf && (
              <label className="pizza-second-flavor">
                Segundo sabor
                <select value={secondId} onChange={(event) => setSecondId(event.target.value)} autoFocus>
                  <option value="">Escolha a outra metade…</option>
                  {pizzas.filter((pizza) => pizza.id !== product.id).map((pizza) => (
                    <option key={pizza.id} value={pizza.id}>{pizza.name} · {euro(pizza.sizes[size].price)}</option>
                  ))}
                </select>
                {secondFlavor && (
                  <small>½ {product.name} + ½ {secondFlavor.name} = {euro(roundCurrency(flavorPrice))}</small>
                )}
              </label>
            )}
          </section>

          <section className="pizza-config-block">
            <div className="pizza-config-block-title"><span>03</span><div><h3>Rebordo recheado</h3><p>Opcional · valor por pizza</p></div></div>
            <div className="pizza-crust-options">
              <button className={!crustId ? 'selected' : ''} type="button" onClick={() => setCrustId('')}>
                <b>Sem rebordo</b><span>Incluído</span>
              </button>
              {stuffedCrusts.map((item) => (
                <button className={crustId === item.id ? 'selected' : ''} type="button" key={item.id} onClick={() => setCrustId(item.id)}>
                  <b>{item.name}</b><span>＋ {euro(item.price)}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <footer className="pizza-config-footer">
          <div>
            <span>Total desta pizza</span>
            <strong>{halfAndHalf && !secondFlavor ? '—' : euro(total)}</strong>
          </div>
          <button type="button" disabled={halfAndHalf && !secondFlavor} onClick={addPizza}>
            Adicionar ao carrinho <span>→</span>
          </button>
        </footer>
      </section>
    </div>
  );
}

function ProductCard({ product, pizzas, onAdded }) {
  const { addItem } = useCart();
  const [size, setSize] = useState('small');
  const [configuring, setConfiguring] = useState(false);
  const price = product.sizes ? product.sizes[size].price : product.price;

  const add = () => {
    if (product.sizes) {
      setConfiguring(true);
      return;
    }
    addItem(product, null);
    onAdded(product.name);
  };

  return (
    <article className={`product-card tone-${product.category}`}>
      <div className="product-art" aria-hidden="true">
        <span>{product.emoji}</span>
        <img src={menuImage(product)} alt="" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.hidden = true; }} />
      </div>
      <div className="product-shade" />
      <div className="product-content">
        <div className="product-heading">
          <h3>{product.name}</h3>
          {!product.sizes && <span className="price-badge">{euro(product.price)}</span>}
        </div>
        <p>{product.ingredients}</p>
        {product.sizes && (
          <div className="size-picker" aria-label="Escolher tamanho">
            {Object.entries(product.sizes).map(([key, value]) => (
              <button className={size === key ? 'selected' : ''} type="button" key={key} onClick={() => setSize(key)}>
                <span>{value.label}</span><b>{euro(value.price)}</b>
              </button>
            ))}
          </div>
        )}
        <button className="add-cart-btn" type="button" onClick={add}>
          <span>＋</span> Adicionar <b>{euro(price)}</b>
        </button>
      </div>
      {configuring && createPortal(
        <PizzaConfigurator
          product={product}
          size={size}
          pizzas={pizzas}
          onClose={() => setConfiguring(false)}
          onAdded={onAdded}
        />,
        document.body,
      )}
    </article>
  );
}

export default function Menu() {
  const { categories } = useMenu();
  const [active, setActive] = useState('traditional');
  const [toast, setToast] = useState('');
  const { count, subtotal } = useCart();
  const timer = useRef(null);
  const category = categories.find((item) => item.id === active);
  const pizzas = categories
    .filter((item) => item.id === 'traditional' || item.id === 'sweet')
    .flatMap((item) => item.items);

  useEffect(() => () => clearTimeout(timer.current), []);

  const showAdded = (name) => {
    setToast(`${name} adicionado ao carrinho`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 2200);
  };

  return (
    <>
      <header className="page-header menu-header">
        <p className="eyebrow">Galleria dei Sapori</p>
        <h1>O Nosso Menu</h1>
        <p>Cada prato é preparado com ingredientes selecionados e paixão genuína. Escolha, adicione ao carrinho e termine a encomenda sem repetir escolhas.</p>
      </header>

      <section className="menu-section">
        <div className="category-slider" role="tablist" aria-label="Categorias do menu">
          {categories.map((item) => (
            <button key={item.id} className={active === item.id ? 'active' : ''} type="button" onClick={() => setActive(item.id)}>
              <span>{item.icon}</span><b>{item.short}</b><small>{item.items.length} opções</small>
            </button>
          ))}
        </div>

        <div className="category-intro">
          <p className="eyebrow">{category.eyebrow}</p>
          <h2>{category.label}</h2>
          {category.id === 'pasta' && <span>Escolha a sua massa: Talharim, Penne ou Espaguete.</span>}
        </div>

        <div className="product-grid" key={category.id}>
          {category.items.map((product) => <ProductCard key={product.id} product={product} pizzas={pizzas} onAdded={showAdded} />)}
        </div>
      </section>

      {toast && <div className="cart-toast" role="status"><span>✓</span>{toast}</div>}
      {count > 0 && (
        <div className="floating-cart">
          <div><span>{count} {count === 1 ? 'artigo' : 'artigos'}</span><strong>{euro(subtotal)}</strong></div>
          <Link to="/encomenda">Ver encomenda <span>→</span></Link>
        </div>
      )}
    </>
  );
}
