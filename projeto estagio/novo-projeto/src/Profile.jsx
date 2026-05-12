import { Link } from 'react-router-dom';
import { getCurrentUser } from './auth.js';

export default function Profile() {
  const user = getCurrentUser();

  if (!user) {
    return (
      <div className="page-card">
        <h2>Perfil não encontrado</h2>
        <p className="card-copy">Você precisa estar logado para ver o perfil.</p>
        <Link to="/login" className="nav-link">Fazer Login</Link>
      </div>
    );
  }

  return (
    <div className="page-card">
      <h2>Meu Perfil</h2>
      <div className="profile-info">
        <p><strong>Usuário:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user.id}</p>
        <p className="card-copy">Aqui você pode acessar as suas builds salvas, gerenciar favoritos e sair quando quiser.</p>
      </div>
      <div className="auth-actions">
        <Link to="/saved-builds" className="nav-link">Minhas Builds</Link>
        <Link to="/components" className="nav-link">Componentes</Link>
      </div>
    </div>
  );
}
