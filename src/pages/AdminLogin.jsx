import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function AdminLogin() {
  const { authenticated, loading, login } = useAdmin();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (loading) return <section className="admin-login-page"><p>A verificar acesso…</p></section>;
  if (authenticated) return <Navigate to="/admin" replace />;

  const submit = async () => {
    setError('');
    setBusy(true);
    try {
      await login();
      navigate('/admin', { replace: true });
    } catch (loginError) {
      if (loginError.code !== 'auth/popup-closed-by-user') {
        if (loginError.code === 'auth/network-request-failed') {
          setError('Não foi possível contactar o Google. Verifique a ligação e tente novamente.');
        } else if (loginError.code === 'auth/unauthorized-domain') {
          setError('Este domínio ainda não está autorizado no Firebase.');
        } else {
          setError(loginError.message || 'Não foi possível iniciar sessão.');
        }
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-lock" aria-hidden="true">⌁</div>
        <p className="eyebrow">Área reservada</p>
        <h1>Painel de administrador</h1>
        <p className="admin-login-copy">
          Entre com a conta Google autorizada para gerir produtos e preços.
        </p>

        {error && <p className="admin-form-error" role="alert">{error}</p>}
        <button className="admin-primary-btn admin-google-btn" type="button" onClick={submit} disabled={busy}>
          <span aria-hidden="true">G</span>
          {busy ? 'A entrar…' : 'Entrar com Google'}
        </button>

        <p className="admin-local-note"><span>i</span> O acesso é protegido pelo Firebase e as alterações ficam disponíveis em todos os dispositivos.</p>
      </div>
    </section>
  );
}
