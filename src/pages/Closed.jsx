import { Link } from 'react-router-dom';

export default function Closed({ status }) {
  const isMonday = status?.closedForDay;

  return (
    <section className="closed-page">
      <div className="closed-card">
        <p className="eyebrow">Sant&apos; Orégano</p>
        <h1>Estamos encerrados neste momento</h1>
        <p>
          O website fica indisponível fora do horário de funcionamento para evitar
          encomendas quando a pizzaria está fechada.
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

        <Link className="btn btn-outline" to="/admin/login">Área de administrador</Link>
      </div>
    </section>
  );
}
