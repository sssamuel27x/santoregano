import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Closed({ status }) {
  const { t } = useLanguage();
  const isMonday = status?.closedForDay;

  return (
    <section className="closed-page">
      <div className="closed-card">
        <p className="eyebrow">Sant&apos; Orégano</p>
        <h1>{t('closed.title')}</h1>
        <p>{t('closed.desc')}</p>

        <div className="closed-hours">
          <div>
            <span>{t('closed.schedule')}</span>
            <strong>{t('closed.scheduleValue')}</strong>
          </div>
          <div>
            <span>{t('closed.monday')}</span>
            <strong>{t('closed.closed')}</strong>
          </div>
        </div>

        <p className="closed-note">
          {isMonday
            ? t('closed.mondayNote')
            : t('closed.normalNote')}
        </p>

        <div className="closed-actions">
          <Link className="btn btn-primary" to="/pizzas">{t('closed.viewMenu')}</Link>
          <Link className="btn btn-outline" to="/admin/login">{t('closed.adminArea')}</Link>
        </div>
      </div>
    </section>
  );
}
