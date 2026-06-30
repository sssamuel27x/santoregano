import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { euro, stuffedCrusts } from '../data/menu';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useMenu } from '../context/MenuContext';
import { useRestaurantStatus } from '../hooks/useRestaurantStatus';
import { hideBrokenImage, menuImage, showLoadedImage } from '../utils/menuImages';

const roundCurrency = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

function PizzaConfigurator({ product, size, pizzas, ordersOpen, onClose, onAdded }) {
  const { addConfiguredPizza } = useCart();
  const { t } = useLanguage();
  const [halfAndHalf, setHalfAndHalf] = useState(false);
  const [secondId, setSecondId] = useState('');
  const [crustId, setCrustId] = useState('');
  const [primaryChoiceId, setPrimaryChoiceId] = useState('');
  const [secondChoiceId, setSecondChoiceId] = useState('');
  const secondFlavor = pizzas.find((pizza) => pizza.id === secondId) || null;
  const crust = stuffedCrusts.find((item) => item.id === crustId) || null;
  const primaryChoice = product.choice?.options.find((item) => item.id === primaryChoiceId) || null;
  const secondChoice = secondFlavor?.choice?.options.find((item) => item.id === secondChoiceId) || null;
  const sizeInfo = product.sizes[size];
  const flavorPrice = secondFlavor
    ? (sizeInfo.price / 2) + (secondFlavor.sizes[size].price / 2)
    : sizeInfo.price;
  const total = roundCurrency(flavorPrice + (crust?.price || 0));
  const missingRequiredChoice = (product.choice && !primaryChoice)
    || (halfAndHalf && secondFlavor?.choice && !secondChoice);
  const cannotAdd = !ordersOpen || (halfAndHalf && !secondFlavor) || missingRequiredChoice;

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

  useEffect(() => {
    setSecondChoiceId('');
  }, [secondId]);

  const addPizza = () => {
    if (cannotAdd) return;
    addConfiguredPizza({
      product,
      size,
      secondFlavor: halfAndHalf ? secondFlavor : null,
      crust,
      primaryChoice,
      secondChoice: halfAndHalf ? secondChoice : null,
      price: total,
    });
    onAdded(halfAndHalf && secondFlavor ? `${product.name} + ${secondFlavor.name}` : product.name);
    onClose();
  };

  return (
    <div className="pizza-config-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="pizza-config" role="dialog" aria-modal="true" aria-labelledby="pizza-config-title">
        <header className="pizza-config-header">
          <div className="pizza-config-hero" aria-hidden="true">
            <img src={menuImage(product)} alt="" onLoad={showLoadedImage} onError={hideBrokenImage} />
            <span>{t('menu.noImage')}</span>
          </div>
          <div>
            <p className="eyebrow">{t('menu.customizePizza')}</p>
            <h2 id="pizza-config-title">{product.name}</h2>
            <p>{product.ingredients}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={t('menu.closeCustomization')}>×</button>
        </header>

        <div className="pizza-config-body">
          <section className="pizza-config-block">
            <div className="pizza-config-block-title"><span>01</span><div><h3>{t('menu.size')}</h3><p>{t('menu.selectedInMenu')}</p></div></div>
            <div className="pizza-selected-size"><b>{sizeInfo.label}</b><span>{euro(sizeInfo.price)}</span></div>
          </section>

          <section className="pizza-config-block">
            <div className="pizza-config-block-title"><span>02</span><div><h3>{t('menu.flavors')}</h3><p>{t('menu.flavorsHelp')}</p></div></div>
            <div className="pizza-flavor-mode">
              <button className={!halfAndHalf ? 'selected' : ''} type="button" onClick={() => { setHalfAndHalf(false); setSecondId(''); }}>
                <span>●</span><b>{t('menu.wholePizza')}</b><small>{product.name}</small>
              </button>
              <button className={halfAndHalf ? 'selected' : ''} type="button" onClick={() => setHalfAndHalf(true)}>
                <span>◐</span><b>{t('menu.halfHalf')}</b><small>{t('menu.combine')}</small>
              </button>
            </div>
            {halfAndHalf && (
              <label className="pizza-second-flavor">
                {t('menu.secondFlavor')}
                <select value={secondId} onChange={(event) => setSecondId(event.target.value)} autoFocus>
                  <option value="">{t('menu.chooseOtherHalf')}</option>
                  {pizzas.filter((pizza) => pizza.id !== product.id).map((pizza) => (
                    <option key={pizza.id} value={pizza.id}>{pizza.name} · {euro(pizza.sizes[size].price)}</option>
                  ))}
                </select>
                {secondFlavor && (
                  <small>½ {product.name} + ½ {secondFlavor.name} = {euro(roundCurrency(flavorPrice))}</small>
                )}
              </label>
            )}
            {(product.choice || (halfAndHalf && secondFlavor?.choice)) && (
              <div className="pizza-choice-fields">
                {product.choice && (
                  <label className="pizza-second-flavor">
                    {halfAndHalf ? t('menu.optionForHalf', { name: product.name }) : product.choice.label}
                    <select value={primaryChoiceId} onChange={(event) => setPrimaryChoiceId(event.target.value)}>
                      <option value="">{t('menu.chooseOption')}</option>
                      {product.choice.options.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </label>
                )}
                {halfAndHalf && secondFlavor?.choice && (
                  <label className="pizza-second-flavor">
                    {t('menu.optionForHalf', { name: secondFlavor.name })}
                    <select value={secondChoiceId} onChange={(event) => setSecondChoiceId(event.target.value)}>
                      <option value="">{t('menu.chooseOption')}</option>
                      {secondFlavor.choice.options.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
            )}
          </section>

          <section className="pizza-config-block">
            <div className="pizza-config-block-title"><span>03</span><div><h3>{t('menu.stuffedCrust')}</h3><p>{t('menu.stuffedCrustHelp')}</p></div></div>
            <div className="pizza-crust-options">
              <button className={!crustId ? 'selected' : ''} type="button" onClick={() => setCrustId('')}>
                <b>{t('menu.noCrust')}</b><span>{t('menu.included')}</span>
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
            <span>{t('menu.totalPizza')}</span>
            <strong>{ordersOpen ? (cannotAdd ? '—' : euro(total)) : t('menu.closed')}</strong>
          </div>
          <button type="button" disabled={cannotAdd} onClick={addPizza}>
            {ordersOpen ? t('menu.addCart') : t('menu.ordersClosed')} <span>→</span>
          </button>
        </footer>
      </section>
    </div>
  );
}

function ProductChoiceConfigurator({ product, ordersOpen, onClose, onAdded }) {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [choiceId, setChoiceId] = useState('');
  const choice = product.choice.options.find((option) => option.id === choiceId) || null;

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

  const addProduct = () => {
    if (!ordersOpen || !choice) return;
    addItem(product, null, choice);
    onAdded(`${product.name} (${choice.name})`);
    onClose();
  };

  return (
    <div className="pizza-config-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="pizza-config product-choice-config" role="dialog" aria-modal="true" aria-labelledby="product-choice-title">
        <header className="pizza-config-header">
          <div className="pizza-config-hero" aria-hidden="true">
            <img src={menuImage(product)} alt="" onLoad={showLoadedImage} onError={hideBrokenImage} />
            <span>{t('menu.noImage')}</span>
          </div>
          <div>
            <p className="eyebrow">{t('menu.customizeProduct')}</p>
            <h2 id="product-choice-title">{product.name}</h2>
            <p>{product.ingredients}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={t('menu.closeCustomization')}>×</button>
        </header>

        <div className="pizza-config-body">
          <section className="pizza-config-block">
            <div className="pizza-config-block-title"><span>01</span><div><h3>{product.choice.label}</h3><p>{t('menu.productChoiceHelp')}</p></div></div>
            <div className="pizza-crust-options">
              {product.choice.options.map((option) => (
                <button className={choiceId === option.id ? 'selected' : ''} type="button" key={option.id} onClick={() => setChoiceId(option.id)}>
                  <b>{option.name}</b><span>{choiceId === option.id ? t('menu.selected') : t('menu.choose')}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <footer className="pizza-config-footer">
          <div><span>{t('menu.totalProduct')}</span><strong>{euro(product.price)}</strong></div>
          <button type="button" disabled={!ordersOpen || !choice} onClick={addProduct}>
            {ordersOpen ? t('menu.addCart') : t('menu.ordersClosed')} <span>→</span>
          </button>
        </footer>
      </section>
    </div>
  );
}

function ProductCard({ product, pizzas, ordersOpen, onAdded }) {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [size, setSize] = useState('small');
  const [configuring, setConfiguring] = useState(false);
  const price = product.sizes ? product.sizes[size].price : product.price;

  const add = () => {
    if (!ordersOpen) return;
    if (product.sizes) {
      setConfiguring(true);
      return;
    }
    if (product.choice) {
      setConfiguring(true);
      return;
    }
    addItem(product, null);
    onAdded(product.name);
  };

  return (
    <article className={`product-card tone-${product.category}`}>
      <div className="product-art" aria-hidden="true">
        <img src={menuImage(product)} alt="" loading="lazy" decoding="async" onLoad={showLoadedImage} onError={hideBrokenImage} />
        <span>{t('menu.noImage')}</span>
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
        <button
          className="add-cart-btn"
          type="button"
          onClick={add}
          disabled={!ordersOpen}
          title={ordersOpen ? t('menu.addTitle') : t('menu.unavailableTitle')}
        >
          {ordersOpen ? (
            <><span>＋</span> {t('menu.add')} <b>{euro(price)}</b></>
          ) : (
            <><span>⏳</span> {t('menu.ordersClosed')}</>
          )}
        </button>
      </div>
      {configuring && createPortal(
        product.sizes ? (
          <PizzaConfigurator
            product={product}
            size={size}
            pizzas={pizzas}
            ordersOpen={ordersOpen}
            onClose={() => setConfiguring(false)}
            onAdded={onAdded}
          />
        ) : (
          <ProductChoiceConfigurator
            product={product}
            ordersOpen={ordersOpen}
            onClose={() => setConfiguring(false)}
            onAdded={onAdded}
          />
        ),
        document.body,
      )}
    </article>
  );
}

export default function Menu() {
  const { categories } = useMenu();
  const { t } = useLanguage();
  const status = useRestaurantStatus();
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
    setToast(t('menu.added', { name }));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 2200);
  };

  return (
    <>
      <header className="page-header menu-header">
        <p className="eyebrow">{t('menu.eyebrow')}</p>
        <h1>{t('menu.title')}</h1>
        <p>{t('menu.desc')}</p>
      </header>

      <section className="menu-section">
        <div className="category-slider" role="tablist" aria-label={t('menu.categoriesAria')}>
          {categories.map((item) => (
            <button key={item.id} className={active === item.id ? 'active' : ''} type="button" onClick={() => setActive(item.id)}>
              <span>{item.icon}</span><b>{t(`categories.${item.id}.short`, {}, item.short)}</b><small>{t('menu.optionsCount', { count: item.items.length })}</small>
            </button>
          ))}
        </div>

        <div className="category-intro">
          <p className="eyebrow">{category.eyebrow}</p>
          <h2>{t(`categories.${category.id}.short`, {}, category.label)}</h2>
          {!status.open && <span>{t('menu.consultOnly')}</span>}
          {category.id === 'pasta' && <span>{t('menu.pastaChoice')}</span>}
        </div>

        <div className="product-grid" key={category.id}>
          {category.items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              pizzas={pizzas}
              ordersOpen={status.open}
              onAdded={showAdded}
            />
          ))}
        </div>
      </section>

      {toast && <div className="cart-toast" role="status"><span>✓</span>{toast}</div>}
      {count > 0 && (
        <div className="floating-cart">
          <div><span>{count} {count === 1 ? t('menu.item') : t('menu.items')}</span><strong>{euro(subtotal)}</strong></div>
          <Link to="/encomenda">{t('menu.viewOrder')} <span>→</span></Link>
        </div>
      )}
    </>
  );
}
