import { Link } from 'react-router-dom';

export default function Closed({ status }) {
  const isMonday = status?.closedForDay;

  return (
    <section className="closed-page">
      <div className="closed-card">
        <p className="eyebrow">Sant&apos; Orégano</p>
        <h1>Encomendas fechadas neste momento</h1>
        <p>
          Fora do horário de funcionamento não é possível finalizar encomendas.
          Pode voltar ao menu e consultar os produtos disponíveis.
        </p>

        <div className="closed-hours">
          <div>
            <span>Horário</span>
            <strong>Terça a Domingo · 12:00 – 23:00</strong>
          </div>
          <div>
            <span>Segunda-feira</span>
            <strong>Encerrado</strong>
          </div>
        </div>

        <p className="closed-note">
          {isMonday
            ? 'Voltamos amanhã às 12:00.'
            : 'Voltamos a aceitar encomendas durante o horário normal.'}
        </p>

        <div className="closed-actions">
          <Link className="btn btn-primary" to="/pizzas">Ver menu</Link>
          <Link className="btn btn-outline" to="/admin/login">Área de administrador</Link>
        </div>
      </div>
    </section>
  );
}
