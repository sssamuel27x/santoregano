const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export default function Contacts() {
  return (
    <>
      <header className="page-header">
        <p className="eyebrow">O Ritual</p>
        <h1>Contactos &amp; Horário</h1>
        <p>Estamos no coração de Águeda, prontos para o receber. Consulte o nosso horário e venha visitar-nos.</p>
      </header>
      <section className="contact-section">
        <div className="contact-grid">
          <article className="info-card schedule-card">
            <h2><span>🕐</span> Horário</h2>
            {days.map((day) => <div className="schedule-row" key={day}><span>{day}</span><strong>12:00 – 22:00</strong></div>)}
            <div className="schedule-row"><span>Domingo</span><strong className="closed">Encerrado</strong></div>
            <p className="schedule-note">* Em feriados, o horário de funcionamento pode ser diferente.</p>
          </article>
          <article className="info-card location-card">
            <h2>Onde Estamos</h2>
            <div className="contact-detail"><span>📍</span><div><small>Morada</small><p>Praça Conde de Águeda<br />3750-109 Águeda, Portugal</p></div></div>
            <div className="contact-detail"><span>📞</span><div><small>Telefone</small><p><a href="tel:+351926965965">926 965 965</a></p></div></div>
            <a className="btn btn-primary directions" href="https://maps.app.goo.gl/JYGzngUkDUwMYt1s8" target="_blank" rel="noreferrer">✈ Obter Direções</a>
            <div className="map-wrap"><iframe title="Localização Sant' Orégano" src="https://maps.google.com/maps?q=Pra%C3%A7a+Conde+de+%C3%81gueda%2C+3750-109+%C3%81gueda%2C+Portugal&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </article>
        </div>
      </section>
    </>
  );
}
