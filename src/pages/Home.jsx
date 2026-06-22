import { Link } from 'react-router-dom';

const restaurantPhoto = '/restaurant.jpg';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <p className="eyebrow">Forno a Lenha · Águeda</p>
          <h1 className="hero-title">
            <span>O Coração<br />de Águeda</span>
            <em>Pulsa em<br />Fogo e Ervas.</em>
          </h1>
          <p className="hero-desc">No centro histórico da Praça Conde de Águeda, o Sant' Orégano é onde a tradição italianó-brasileira encontra a alma portuguesa. Pizzas artesanais, assadas em forno a lenha, com ingredientes frescos e paixão genuína.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/pizzas">Ver Menu →</Link>
            <Link className="btn btn-outline" to="/contactos">Contactos</Link>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img-wrap">
            <img src={restaurantPhoto} alt="Sant' Orégano em Águeda" />
            <span className="hero-img-tag">Venha visitar!</span>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg" />
        <div className="cta-content">
          <p className="eyebrow">A nossa casa</p>
          <h2>Venha provar o melhor de Águeda.</h2>
          <p>Estamos na Praça Conde de Águeda, prontos para o receber com pizzas frescas, ambiente acolhedor e o calor do nosso forno a lenha.</p>
          <Link className="btn btn-primary" to="/contactos">Como Chegar →</Link>
        </div>
      </section>
    </>
  );
}
