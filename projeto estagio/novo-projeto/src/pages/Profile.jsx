import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, clearAuthStorage } from '../lib/auth.js';
import { api } from '../services/api.js';
import SavedBuilds from '../components/SavedBuilds.jsx';

export default function Profile() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  if (!user) {
    return (
      <div className="page-card">
        <h2>Perfil não encontrado</h2>
        <p className="card-copy">Você precisa estar logado para ver o perfil.</p>
        <Link to="/login" className="nav-link">Fazer Login</Link>
      </div>
    );
  }

  const deleteAccount = async () => {
    if (!window.confirm('Tem certeza que deseja apagar sua conta? Esta ação não pode ser desfeita.')) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.delete('/api/auth/delete-account');
      clearAuthStorage();
      localStorage.removeItem(`savedBuilds_${user.email}`);
      setSuccess('Conta apagada com sucesso.');
      setTimeout(() => navigate('/signup'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Falha ao apagar a conta. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-card">
      <h2>Meu Perfil</h2>
      <div className="profile-info">
        <p><strong>Nome:</strong> {user.name || user.email.split('@')[0]}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user.id}</p>
        <p className="card-copy">Aqui você pode acessar as suas builds salvas, gerenciar favoritos e sair quando quiser.</p>
      </div>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
      <div className="auth-actions">
        <Link to="/components" className="nav-link">Componentes</Link>
        <button className="secondary" onClick={deleteAccount} disabled={loading}>
          {loading ? 'Apagando...' : 'Apagar Conta'}
        </button>
      </div>
      <SavedBuilds />
    </div>
  );
}
