import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
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
        <p className="eyebrow">Ordine dal Forno</p>
        <h1>A Sua Encomenda</h1>
        <p>O que escolheu no menu já está aqui, com o preço calculado. Só falta dizer-nos como quer receber.</p>
      </header>

      {!cart.length ? (
        <section className="empty-cart">
          <span>🍕</span>
          <h2>O carrinho ainda está vazio.</h2>
          <p>Explore o menu e adicione as suas pizzas, entradas, massas, refeições e bebidas.</p>
          <Link className="btn btn-primary" to="/pizzas">Explorar o menu →</Link>
        </section>
      ) : (
        <form className="checkout" onSubmit={submitOrder}>
          <div className="checkout-main">
            <section className="checkout-card cart-review">
              <div className="section-heading"><div><span>01</span><h2>O seu pedido</h2></div><Link to="/pizzas">＋ Adicionar mais</Link></div>
              <div className="order-items">
                {grouped.map((item) => (
                  <div className="order-item" key={item.id}>
                    <div className="order-image">
                      <img src={menuImage(item)} alt="" onLoad={showLoadedImage} onError={hideBrokenImage} />
                      <span>Sem imagem</span>
                    </div>
                    <div className="order-item-name"><h3>{item.name}</h3><p>{item.size || item.category}{item.crust ? ` · Rebordo: ${item.crust}` : ''}</p><button type="button" onClick={() => removeItem(item.id)}>Remover</button></div>
                    <div className="quantity-control">
                      <button type="button" aria-label="Diminuir quantidade" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" aria-label="Aumentar quantidade" onClick={() => updateQuantity(item.id, item.quantity + 1)}>＋</button>
                    </div>
                    <strong className="line-price">{euro(item.lineTotal)}</strong>
                  </div>
                ))}
              </div>
              <button className="clear-cart" type="button" onClick={clearCart}>Esvaziar carrinho</button>
            </section>

            <section className="checkout-card">
              <div className="section-heading"><div><span>02</span><h2>Contacto</h2></div></div>
              <div className="form-grid two">
                <label>Nome<input className={errors.name ? 'invalid' : ''} value={name} onChange={(e) => setName(e.target.value)} placeholder="O seu nome" autoComplete="name" />{errors.name && <small>Introduza o seu nome.</small>}</label>
                <label>Telefone<input className={errors.phone ? 'invalid' : ''} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9XX XXX XXX" autoComplete="tel" />{errors.phone && <small>Introduza um contacto válido.</small>}</label>
              </div>
            </section>

            <section className="checkout-card">
              <div className="section-heading"><div><span>03</span><h2>Entrega</h2></div></div>
              <div className="choice-grid">
                <button className={fulfilment === 'takeaway' ? 'selected' : ''} type="button" onClick={() => setFulfilment('takeaway')}><span>🏠</span><b>Takeaway</b><small>Levanto na pizzaria</small></button>
                <button className={fulfilment === 'delivery' ? 'selected' : ''} type="button" onClick={() => setFulfilment('delivery')}><span>🛵</span><b>Entrega em casa</b><small>Desde 1€</small></button>
              </div>
              {fulfilment === 'delivery' && (
                <div className="address-lookup">
                  <label className="full-field">
                    Morada
                    <input
                      className={errors.address ? 'invalid' : ''}
                      value={address}
                      onChange={(event) => {
                        setAddress(event.target.value);
                        setErrors((current) => ({ ...current, address: false, route: false }));
                      }}
                      placeholder="Rua, número, localidade e código postal"
                      autoComplete="street-address"
                    />
                    {errors.address && <small>Introduza a morada de entrega.</small>}
                    <em>Se a morada não for reconhecida pelo sistema, prossiga mesmo assim. A distância e a taxa serão confirmadas pela pizzaria.</em>
                  </label>

                  <div className={`delivery-quote quote-${deliveryQuote.status}`} aria-live="polite">
                    {deliveryQuote.status === 'idle' && <p>Escreva a morada completa para calcular a rota.</p>}
                    {deliveryQuote.status === 'loading' && <p><span className="quote-spinner" /> A calcular distância por estrada…</p>}
                    {deliveryQuote.status === 'success' && (
                      <>
                        <div><strong>{deliveryQuote.distance.toFixed(1).replace('.', ',')} km</strong><span>Cerca de {deliveryQuote.duration} min desde {RESTAURANT.label}</span></div>
                        <b>{euro(deliveryQuote.fee)}</b>
                      </>
                    )}
                    {deliveryQuote.status === 'outside' && <p>Esta morada fica a {deliveryQuote.distance.toFixed(1).replace('.', ',')} km e está fora da área de entrega de 25 km.</p>}
                    {deliveryQuote.status === 'error' && <p>Não encontrámos esta morada, mas pode prosseguir com a encomenda. A pizzaria confirmará a distância e a taxa de entrega.</p>}
                  </div>
                  {errors.route && !errors.address && <p className="route-error">Esta morada está fora da área de entrega de 25 km.</p>}
                  <p className="map-attribution">Cálculo com dados de <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>.</p>
                </div>
              )}
              <label className="full-field">Quando?<input type="datetime-local" value={schedule} onChange={(e) => setSchedule(e.target.value)} /><em>Deixe vazio para receber o mais rápido possível.</em></label>
            </section>

            <section className="checkout-card">
              <div className="section-heading"><div><span>04</span><h2>Pagamento</h2></div></div>
              <div className="payment-grid">
                {[['dinheiro', '💵', 'Dinheiro'], ['mbway', '📱', 'MB Way'], ['cartao', '💳', 'Cartão']].map(([id, icon, label]) => <button className={payment === id ? 'selected' : ''} type="button" key={id} onClick={() => setPayment(id)}><span>{icon}</span><b>{label}</b></button>)}
              </div>
              {fulfilment === 'delivery' && payment === 'dinheiro' && (
                <label className="full-field change-field">
                  Preciso troco para
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={changeFor}
                    onChange={(event) => setChangeFor(event.target.value)}
                    placeholder="Ex.: 20€"
                  />
                  <em>Deixe vazio se não precisar de troco.</em>
                </label>
              )}
              <label className="full-field">Notas para a cozinha<textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Alergias, ponto da massa, instruções de entrega…" rows="3" /></label>
            </section>
          </div>

          <aside className="order-summary">
            <p className="eyebrow">Resumo</p>
            <h2>Total da encomenda</h2>
            <div className="summary-lines">
              <div><span>Subtotal · {cart.reduce((sum, item) => sum + item.quantity, 0)} artigos</span><strong>{euro(subtotal)}</strong></div>
              <div>
                <span>{fulfilment === 'delivery' ? deliveryQuote.status === 'success' ? `Entrega · ${deliveryQuote.distance.toFixed(1).replace('.', ',')} km` : 'Taxa base de entrega' : 'Takeaway'}</span>
                <strong>{fulfilment === 'delivery' && deliveryQuote.status === 'loading'
                  ? 'A calcular…'
                  : fulfilment === 'delivery' && deliveryQuote.status === 'outside'
                    ? 'Indisponível'
                    : fulfilment === 'delivery' && deliveryQuote.status === 'error'
                      ? `${euro(deliveryFee)} provisório`
                      : deliveryFee ? euro(deliveryFee) : 'Grátis'}</strong>
              </div>
            </div>
            <div className="summary-total"><span>Total atual</span><strong>{euro(total)}</strong></div>
            {fulfilment === 'delivery' && deliveryQuote.status !== 'success' && deliveryQuote.status !== 'outside' && <p className="fee-note">Se a morada não for localizada, pode enviar a encomenda. A pizzaria confirmará a taxa final.</p>}
            <button className="whatsapp-btn" type="submit"><span>◉</span> Enviar via WhatsApp</button>
            <p className="checkout-note">O WhatsApp abre com o pedido e todos os valores já preenchidos.</p>
          </aside>
        </form>
      )}
    </>
  );
}
