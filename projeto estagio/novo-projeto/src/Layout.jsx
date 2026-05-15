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
        <div className="top-bar">
          <span>Ofertas exclusivas todos os dias</span>
          <span>Frete grátis acima de R$ 2.000</span>
        </div>

        <div className="header-main">
          <div className="brand">
            <h1>PC Builder</h1>
            <p>Monte seu setup com a experiência de loja online.</p>
          </div>

          <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Buscar componentes, builds e ofertas" />
            <button type="submit">Buscar</button>
          </form>

          <nav className="auth-nav">
            <NavLink to="/login" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              {user ? 'Minha Conta' : 'Login'}
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Criar Conta
            </NavLink>
            <span className="cart-badge">Carrinho</span>
          </nav>
        </div>

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
          <a className="nav-link" href="/" onClick={(e) => e.preventDefault()}>
            PCs Gamer
          </a>
          <a className="nav-link" href="/" onClick={(e) => e.preventDefault()}>
            SSDs
          </a>
          <a className="nav-link" href="/" onClick={(e) => e.preventDefault()}>
            Placas de Vídeo
          </a>
          <a className="nav-link" href="/" onClick={(e) => e.preventDefault()}>
            Acessórios
          </a>
        </nav>
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
