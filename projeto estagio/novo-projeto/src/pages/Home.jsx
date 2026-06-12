import { useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  const success = location.state?.success || '';

  return (
    <div className="home-grid home-store">
      <section className="store-hero page-card">
        <div className="store-hero-copy">
          {success && <p className="success-text">{success}</p>}
          <h2>Os melhores componentes para montar seu PC</h2>
          <p className="hero-text">
            Chegue mais rápido à configuração ideal com sugestões de builds e compatibilidade garantida.
          </p>
          <div className="hero-actions">
            <a href="/components" className="store-action primary">Ver Componentes</a>
            <a href="/build" className="store-action secondary">Montar Build</a>
          </div>
        </div>
      </section>
    </div>
  );
}
