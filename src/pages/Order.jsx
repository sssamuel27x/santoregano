import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { euro } from '../data/menu';
import { hideBrokenImage, menuImage, showLoadedImage } from '../utils/menuImages';

const WHATSAPP_NUMBER = '351926965965';
const RESTAURANT = { lat: 40.5725835, lon: -8.4454473, label: 'Praça Conde de Águeda' };
const GEOCODING_URL = 'https://nominatim.openstreetmap.org/search';
const ROUTING_URL = 'https://router.project-osrm.org/route/v1/driving';
const DELIVERY_CACHE_KEY = 'santoregano-delivery-cache-v1';
const CACHE_LIFETIME = 7 * 24 * 60 * 60 * 1000;
const EMPTY_QUOTE = { status: 'idle', distance: 0, duration: 0, fee: 0, displayName: '' };

function readDeliveryCache() {
  try {
    return JSON.parse(localStorage.getItem(DELIVERY_CACHE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveDeliveryQuote(key, quote) {
  try {
    const cache = readDeliveryCache();
    cache[key] = { ...quote, cachedAt: Date.now() };
    const entries = Object.entries(cache)
      .sort(([, a], [, b]) => (b.cachedAt || 0) - (a.cachedAt || 0))
      .slice(0, 20);
    localStorage.setItem(DELIVERY_CACHE_KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch {
    // A blocked or full browser cache must not prevent a valid delivery quote.
  }
}

export default function Order() {
  const { cart, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { t } = useLanguage();
  const [fulfilment, setFulfilment] = useState('takeaway');
  const [payment, setPayment] = useState('dinheiro');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [schedule, setSchedule] = useState('');
  const [changeFor, setChangeFor] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [deliveryQuote, setDeliveryQuote] = useState(EMPTY_QUOTE);

  const deliveryFee = fulfilment === 'delivery'
    ? deliveryQuote.status === 'success' ? deliveryQuote.fee : deliveryQuote.status === 'outside' ? 0 : 1
    : 0;
  const total = subtotal + deliveryFee;
  const grouped = useMemo(() => cart.map((item) => ({ ...item, lineTotal: item.price * item.quantity })), [cart]);

  useEffect(() => {
    if (fulfilment !== 'delivery') {
      setDeliveryQuote(EMPTY_QUOTE);
      return undefined;
    }

    const query = address.trim();
    if (query.length < 6) {
      setDeliveryQuote(EMPTY_QUOTE);
      return undefined;
    }

    const cacheKey = query.toLocaleLowerCase('pt-PT').replace(/\s+/g, ' ');
    const cached = readDeliveryCache()[cacheKey];
    if (cached && Date.now() - cached.cachedAt < CACHE_LIFETIME) {
      setDeliveryQuote(cached);
      return undefined;
    }

    setDeliveryQuote(EMPTY_QUOTE);
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setDeliveryQuote({ ...EMPTY_QUOTE, status: 'loading' });
      try {
        const params = new URLSearchParams({
          q: `${query}, Aveiro, Portugal`,
          format: 'jsonv2',
          limit: '1',
          countrycodes: 'pt',
          addressdetails: '1',
          'accept-language': 'pt-PT',
          viewbox: '-8.9,40.9,-8.0,40.2',
          bounded: '0',
        });
        const geocodeResponse = await fetch(`${GEOCODING_URL}?${params}`, { signal: controller.signal });
        if (!geocodeResponse.ok) throw new Error('Geocoding unavailable');
        const locations = await geocodeResponse.json();
        if (!locations.length) throw new Error('Address not found');

        const destination = { lat: Number(locations[0].lat), lon: Number(locations[0].lon) };
        const routeResponse = await fetch(
          `${ROUTING_URL}/${RESTAURANT.lon},${RESTAURANT.lat};${destination.lon},${destination.lat}?overview=false&steps=false`,
          { signal: controller.signal },
        );
        if (!routeResponse.ok) throw new Error('Routing unavailable');
        const routeData = await routeResponse.json();
        if (routeData.code !== 'Ok' || !routeData.routes?.length) throw new Error('Route not found');

        const distance = routeData.routes[0].distance / 1000;
        const duration = Math.max(1, Math.ceil(routeData.routes[0].duration / 60));
        const quote = distance > 25
          ? { status: 'outside', distance, duration, fee: 0, displayName: locations[0].display_name }
          : { status: 'success', distance, duration, fee: 1 + Math.floor(distance / 3), displayName: locations[0].display_name };

        saveDeliveryQuote(cacheKey, quote);
        setDeliveryQuote(quote);
      } catch (error) {
        if (error.name !== 'AbortError') setDeliveryQuote({ ...EMPTY_QUOTE, status: 'error' });
      }
    }, 1200);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [address, fulfilment]);

  useEffect(() => {
    if (deliveryQuote.status !== 'outside') {
      setErrors((current) => ({ ...current, route: false }));
    }
  }, [deliveryQuote.status]);

  const submitOrder = (event) => {
    event.preventDefault();
    const nextErrors = {
      name: !name.trim(),
      phone: !phone.trim(),
      address: fulfilment === 'delivery' && !address.trim(),
      route: fulfilment === 'delivery' && deliveryQuote.status === 'outside',
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean) || !cart.length) return;

    const code = Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');
    const lines = grouped.map((item) => `• ${item.quantity}× ${item.name}${item.size ? ` (${item.size})` : ''}${item.crust ? ` · Rebordo: ${item.crust}` : ''} — ${euro(item.lineTotal)}`).join('\n');
    const delivery = fulfilment === 'takeaway'
      ? 'Takeaway — levanto na pizzaria'
      : deliveryQuote.status === 'success'
        ? `Entrega para: ${address} (${deliveryQuote.distance.toFixed(1).replace('.', ',')} km · cerca de ${deliveryQuote.duration} min)`
        : `Entrega para: ${address} (morada e distância por confirmar)`;
    const paymentText = payment === 'dinheiro'
      ? `Dinheiro${fulfilment === 'delivery' && changeFor ? ` — preciso de troco para ${changeFor.replace('.', ',')}€` : ''}`
      : payment === 'mbway' ? 'MB Way' : 'Cartão';
    const deliveryLine = fulfilment !== 'delivery'
      ? ''
      : deliveryQuote.status === 'success'
        ? `\n*Taxa de entrega (${deliveryQuote.distance.toFixed(1).replace('.', ',')} km):* ${euro(deliveryFee)}`
        : `\n*Taxa base de entrega:* ${euro(deliveryFee)} — morada e valor final por confirmar`;
    const message = `🍕 *Novo Pedido Sant'Orégano* 🍕\n\n*Cliente:* ${name}\n*Contacto:* ${phone}\n*Entrega:* ${delivery}\n*Hora:* ${schedule || 'O mais rápido possível'}\n*Pagamento:* ${paymentText}\n\n*Pedido:*\n${lines}\n\n*Subtotal:* ${euro(subtotal)}${deliveryLine}\n*Total atual:* ${euro(total)}${notes ? `\n\n*Notas:* ${notes}` : ''}\n*Código:* ${code}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <header className="page-header order-header">
        <p className="eyebrow">{t('order.eyebrow')}</p>
        <h1>{t('order.title')}</h1>
        <p>{t('order.desc')}</p>
      </header>

      {!cart.length ? (
        <section className="empty-cart">
          <span>🍕</span>
          <h2>{t('order.emptyTitle')}</h2>
          <p>{t('order.emptyDesc')}</p>
          <Link className="btn btn-primary" to="/pizzas">{t('order.exploreMenu')}</Link>
        </section>
      ) : (
        <form className="checkout" onSubmit={submitOrder}>
          <div className="checkout-main">
            <section className="checkout-card cart-review">
              <div className="section-heading"><div><span>01</span><h2>{t('order.yourOrder')}</h2></div><Link to="/pizzas">{t('order.addMore')}</Link></div>
              <div className="order-items">
                {grouped.map((item) => (
                  <div className="order-item" key={item.id}>
                    <div className="order-image">
                      <img src={menuImage(item)} alt="" onLoad={showLoadedImage} onError={hideBrokenImage} />
                      <span>{t('order.noImage')}</span>
                    </div>
                    <div className="order-item-name"><h3>{item.name}</h3><p>{item.size || item.category}{item.crust ? ` · Rebordo: ${item.crust}` : ''}</p><button type="button" onClick={() => removeItem(item.id)}>{t('order.remove')}</button></div>
                    <div className="quantity-control">
                      <button type="button" aria-label={t('order.decreaseQty')} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" aria-label={t('order.increaseQty')} onClick={() => updateQuantity(item.id, item.quantity + 1)}>＋</button>
                    </div>
                    <strong className="line-price">{euro(item.lineTotal)}</strong>
                  </div>
                ))}
              </div>
              <button className="clear-cart" type="button" onClick={clearCart}>{t('order.clearCart')}</button>
            </section>

            <section className="checkout-card">
              <div className="section-heading"><div><span>02</span><h2>{t('order.contact')}</h2></div></div>
              <div className="form-grid two">
                <label>{t('order.name')}<input className={errors.name ? 'invalid' : ''} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('order.namePlaceholder')} autoComplete="name" />{errors.name && <small>{t('order.nameError')}</small>}</label>
                <label>{t('order.phone')}<input className={errors.phone ? 'invalid' : ''} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9XX XXX XXX" autoComplete="tel" />{errors.phone && <small>{t('order.phoneError')}</small>}</label>
              </div>
            </section>

            <section className="checkout-card">
              <div className="section-heading"><div><span>03</span><h2>{t('order.delivery')}</h2></div></div>
              <div className="choice-grid">
                <button className={fulfilment === 'takeaway' ? 'selected' : ''} type="button" onClick={() => setFulfilment('takeaway')}><span>🏠</span><b>{t('order.takeaway')}</b><small>{t('order.takeawayHelp')}</small></button>
                <button className={fulfilment === 'delivery' ? 'selected' : ''} type="button" onClick={() => setFulfilment('delivery')}><span>🛵</span><b>{t('order.homeDelivery')}</b><small>{t('order.fromOne')}</small></button>
              </div>
              {fulfilment === 'delivery' && (
                <div className="address-lookup">
                  <label className="full-field">
                    {t('order.address')}
                    <input
                      className={errors.address ? 'invalid' : ''}
                      value={address}
                      onChange={(event) => {
                        setAddress(event.target.value);
                        setErrors((current) => ({ ...current, address: false, route: false }));
                      }}
                      placeholder={t('order.addressPlaceholder')}
                      autoComplete="street-address"
                    />
                    {errors.address && <small>{t('order.addressError')}</small>}
                    <em>{t('order.addressHelp')}</em>
                  </label>

                  <div className={`delivery-quote quote-${deliveryQuote.status}`} aria-live="polite">
                    {deliveryQuote.status === 'idle' && <p>{t('order.routeIdle')}</p>}
                    {deliveryQuote.status === 'loading' && <p><span className="quote-spinner" /> {t('order.routeLoading')}</p>}
                    {deliveryQuote.status === 'success' && (
                      <>
                        <div><strong>{deliveryQuote.distance.toFixed(1).replace('.', ',')} km</strong><span>{t('order.routeFrom', { minutes: deliveryQuote.duration, place: RESTAURANT.label })}</span></div>
                        <b>{euro(deliveryQuote.fee)}</b>
                      </>
                    )}
                    {deliveryQuote.status === 'outside' && <p>{t('order.routeOutside', { distance: deliveryQuote.distance.toFixed(1).replace('.', ',') })}</p>}
                    {deliveryQuote.status === 'error' && <p>{t('order.routeError')}</p>}
                  </div>
                  {errors.route && !errors.address && <p className="route-error">{t('order.outsideError')}</p>}
                  <p className="map-attribution">{t('order.mapAttribution')} <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>.</p>
                </div>
              )}
              <label className="full-field">{t('order.when')}<input type="datetime-local" value={schedule} onChange={(e) => setSchedule(e.target.value)} /><em>{t('order.asap')}</em></label>
            </section>

            <section className="checkout-card">
              <div className="section-heading"><div><span>04</span><h2>{t('order.payment')}</h2></div></div>
              <div className="payment-grid">
                {[['dinheiro', '💵', t('order.cash')], ['mbway', '📱', 'MB Way'], ['cartao', '💳', t('order.card')]].map(([id, icon, label]) => <button className={payment === id ? 'selected' : ''} type="button" key={id} onClick={() => setPayment(id)}><span>{icon}</span><b>{label}</b></button>)}
              </div>
              {fulfilment === 'delivery' && payment === 'dinheiro' && (
                <label className="full-field change-field">
                  {t('order.changeFor')}
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={changeFor}
                    onChange={(event) => setChangeFor(event.target.value)}
                    placeholder={t('order.changePlaceholder')}
                  />
                  <em>{t('order.changeHelp')}</em>
                </label>
              )}
              <label className="full-field">{t('order.kitchenNotes')}<textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t('order.notesPlaceholder')} rows="3" /></label>
            </section>
          </div>

          <aside className="order-summary">
            <p className="eyebrow">{t('order.summary')}</p>
            <h2>{t('order.totalOrder')}</h2>
            <div className="summary-lines">
              <div><span>{t('order.subtotal', { count: cart.reduce((sum, item) => sum + item.quantity, 0) })}</span><strong>{euro(subtotal)}</strong></div>
              <div>
                <span>{fulfilment === 'delivery' ? deliveryQuote.status === 'success' ? t('order.deliveryDistance', { distance: deliveryQuote.distance.toFixed(1).replace('.', ',') }) : t('order.deliveryBase') : t('order.takeaway')}</span>
                <strong>{fulfilment === 'delivery' && deliveryQuote.status === 'loading'
                  ? t('order.calculating')
                  : fulfilment === 'delivery' && deliveryQuote.status === 'outside'
                    ? t('order.unavailable')
                    : fulfilment === 'delivery' && deliveryQuote.status === 'error'
                      ? t('order.temporary', { fee: euro(deliveryFee) })
                      : deliveryFee ? euro(deliveryFee) : t('order.free')}</strong>
              </div>
            </div>
            <div className="summary-total"><span>{t('order.currentTotal')}</span><strong>{euro(total)}</strong></div>
            {fulfilment === 'delivery' && deliveryQuote.status !== 'success' && deliveryQuote.status !== 'outside' && <p className="fee-note">{t('order.feeNote')}</p>}
            <button className="whatsapp-btn" type="submit"><span>◉</span> {t('order.sendWhatsApp')}</button>
            <p className="checkout-note">{t('order.whatsappNote')}</p>
          </aside>
        </form>
      )}
    </>
  );
}
