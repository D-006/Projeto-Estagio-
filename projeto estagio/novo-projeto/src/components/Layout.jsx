import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, clearAuthStorage, getRefreshToken } from '../lib/auth.js';
import { api } from '../services/api.js';
import { useTheme } from '../lib/useTheme.js';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const { theme, toggleTheme } = useTheme();
  const hideCategoryNav = location.pathname === '/account';

  const logout = async () => {
    const refreshToken = getRefreshToken();
    try {
      if (refreshToken) {
        await api.post('/api/auth/logout', { refreshToken });
      }
    } catch {
      /* sessão já inválida */
    }
    clearAuthStorage();
    navigate('/');
  };

  return (
    <div className="app-shell">

      <header className="app-header">
        <div className="header-main">
          <div className="brand">
            <h1>PC Builder</h1>
            <p>Monte seu setup com a experiência de loja online.</p>
          </div>

          <nav className="auth-nav">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  Criar Conta
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/account"
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  Minha Conta
                </NavLink>
                <button type="button" className="secondary" onClick={logout}>
                  Sair
                </button>
              </>
            )}
          </nav>
        </div>

        {!hideCategoryNav && (
        <nav className="category-nav">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Início
          </NavLink>
          <NavLink to="/build" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Montar Build
          </NavLink>
          <NavLink to="/components" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Componentes
          </NavLink>
        </nav>
      )}
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        Desenvolvido para ajudar a montar builds com a experiência de loja online.
      </footer>
    </div>
  );
}