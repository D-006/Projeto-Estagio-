import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from './auth.js';

export default function Layout() {
  const navigate = useNavigate();
  useLocation();
  const user = getCurrentUser();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-top">
          <div className="brand">
            <h1>PC Builder</h1>
            <p>Construa o seu PC ideal com recomendações automáticas de componentes.</p>
          </div>
          <nav className="auth-nav">
            {user ? (
              <>
                <NavLink to="/profile" className={({ isActive }) => `nav-link auth-link${isActive ? ' active' : ''}`}>
                  Perfil
                </NavLink>
                <button className="nav-link auth-link logout-btn" onClick={logout}>
                  Sair
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => `nav-link auth-link${isActive ? ' active' : ''}`}>
                  Login
                </NavLink>
                <NavLink to="/signup" className={({ isActive }) => `nav-link auth-link${isActive ? ' active' : ''}`}>
                  Criar Conta
                </NavLink>
              </>
            )}
          </nav>
        </div>
        
        <nav className="app-nav">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Início
          </NavLink>
          <NavLink to="/build" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Criar Build
          </NavLink>
          <NavLink to="/components" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Componentes
          </NavLink>
          <NavLink to="/saved-builds" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Minhas Builds
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        Desenvolvido para ajudar a montar builds de PC com rapidez.
      </footer>
    </div>
  );
}
