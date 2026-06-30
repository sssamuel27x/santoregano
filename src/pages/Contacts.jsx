import { useLanguage } from '../context/LanguageContext';

export default function Contacts() {
  const { t } = useLanguage();
  const openDays = t('contacts.days');

  return (
    <>
      <header className="page-header">
        <p className="eyebrow">{t('contacts.ritual')}</p>
        <h1>{t('contacts.title')}</h1>
        <p>{t('contacts.desc')}</p>
      </header>
      <section className="contact-section">
        <div className="contact-grid">
          <article className="info-card schedule-card">
            <h2><span>🕐</span> {t('contacts.schedule')}</h2>
            <div className="schedule-row"><span>{t('contacts.monday')}</span><strong className="closed">{t('contacts.closed')}</strong></div>
            {openDays.map((day) => <div className="schedule-row" key={day}><span>{day}</span><strong>12:00 – 23:00</strong></div>)}
            <p className="schedule-note">{t('contacts.note')}</p>
          </article>
          <article className="info-card location-card">
            <h2>{t('contacts.where')}</h2>
            <div className="contact-detail"><span>📍</span><div><small>{t('contacts.address')}</small><p>Praça Conde de Águeda<br />3750-109 Águeda, Portugal</p></div></div>
            <div className="contact-detail"><span>📞</span><div><small>{t('contacts.phone')}</small><p><a href="tel:+351926965965">926 965 965</a></p></div></div>
            <a className="btn btn-primary directions" href="https://maps.app.goo.gl/JYGzngUkDUwMYt1s8" target="_blank" rel="noreferrer">{t('contacts.directions')}</a>
            <div className="map-wrap"><iframe title={t('contacts.mapTitle')} src="https://maps.google.com/maps?q=Pra%C3%A7a+Conde+de+%C3%81gueda%2C+3750-109+%C3%81gueda%2C+Portugal&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </article>
        </div>
      </section>
    </>
  );
}
