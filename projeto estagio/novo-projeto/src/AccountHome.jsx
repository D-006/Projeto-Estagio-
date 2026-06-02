import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from './auth.js';

export default function AccountHome() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="page-card">
      <h2>Bem-vindo(a), {user.name || user.email.split('@')[0]}</h2>
      <p className="card-copy">Você está logado. Agora pode ver os detalhes da sua conta ou sair.</p>

      <div className="auth-actions">
        <Link to="/profile" className="primary">
          Ver Conta
        </Link>
        <button type="button" className="secondary" onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
}
