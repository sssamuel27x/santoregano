import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const restaurantPhoto = '/storefront-hero.png';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <p className="eyebrow">{t('home.eyebrow')}</p>
          <h1 className="hero-title">
            <span dangerouslySetInnerHTML={{ __html: t('home.titleTop') }} />
            <em dangerouslySetInnerHTML={{ __html: t('home.titleEm') }} />
          </h1>
          <p className="hero-desc">{t('home.desc')}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/pizzas">{t('home.viewMenu')}</Link>
            <Link className="btn btn-outline" to="/contactos">{t('home.contacts')}</Link>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img-wrap">
            <img src={restaurantPhoto} alt={t('home.photoAlt')} />
            <span className="hero-img-tag">{t('home.visitTag')}</span>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg" />
        <div className="cta-content">
          <p className="eyebrow">{t('home.house')}</p>
          <h2>{t('home.ctaTitle')}</h2>
          <p>{t('home.ctaDesc')}</p>
          <Link className="btn btn-primary" to="/contactos">{t('home.directions')}</Link>
        </div>
      </section>
    </>
  );
}
