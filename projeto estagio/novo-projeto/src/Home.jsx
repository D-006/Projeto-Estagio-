
import { Link } from 'react-router-dom';
import { getCurrentUser } from './auth.js';

export default function Home() {
  const user = getCurrentUser();

  return (
    <div className="home-grid">
      <section className="page-card">
        <h2>Bem-vindo ao PC Builder</h2>
        <p className="card-copy">
          Planeje e monte o seu computador com recomendações de hardware, componentes atualizados e uma experiência de uso simples.
        </p>
        {user && <p className="card-copy">Olá, <strong>{user.email}</strong>. Continue criando builds ou veja seu perfil.</p>}
      </section>

      <div className="home-cards">
        <article className="home-card">
          <h3 className="card-title">Criar Build</h3>
          <p className="card-copy">Informe o orçamento e o tipo de uso para receber uma sugestão de componentes.</p>
          <Link to="/build" className="nav-link">Ir para Build</Link>
        </article>

        <article className="home-card">
          <h3 className="card-title">Componentes</h3>
          <p className="card-copy">Veja uma lista de componentes disponíveis com detalhes e links de compra.</p>
          <Link to="/components" className="nav-link">Ver Componentes</Link>
        </article>

        {user ? (
          <article className="home-card">
            <h3 className="card-title">Perfil</h3>
            <p className="card-copy">Acesse o seu perfil e faça logout quando quiser.</p>
            <Link to="/profile" className="nav-link">Ver Perfil</Link>
          </article>
        ) : (
          <article className="home-card">
            <h3 className="card-title">Login</h3>
            <p className="card-copy">Acesse sua conta para salvar builds e acompanhar recomendações personalizadas.</p>
            <Link to="/login" className="nav-link">Entrar</Link>
          </article>
        )}
      </div>
    </div>
  );
}

