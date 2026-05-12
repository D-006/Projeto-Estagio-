import { useState } from 'react';
import { Link } from 'react-router-dom';

function decodeJwt(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = parts[1];
    const padded = payload.padEnd(payload.length + (4 - (payload.length % 4)) % 4, '=');
    const decoded = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function getCurrentUser() {
  const token = localStorage.getItem('token');
  return decodeJwt(token);
}

export default function SavedBuilds() {
  const currentUser = getCurrentUser();
  const [user] = useState(currentUser);
  const [builds, setBuilds] = useState(() => {
    if (!currentUser) return [];
    return JSON.parse(localStorage.getItem(`savedBuilds_${currentUser.email}`) || '[]');
  });
  const [loading] = useState(false);
  const [selectedBuild, setSelectedBuild] = useState(null);

  const removeBuild = id => {
    if (!user) return;
    const key = `savedBuilds_${user.email}`;
    const updated = builds.filter(build => build.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
    setBuilds(updated);
  };

  const clearBuilds = () => {
    if (!user) return;
    const key = `savedBuilds_${user.email}`;
    localStorage.setItem(key, '[]');
    setBuilds([]);
  };

  const renderComponentList = (components) => {
    return Object.entries(components).map(([category, component]) => (
      <li key={component.id} className="component-item">
        <div className="component-item-title">
          <span className="component-type">{category.toUpperCase()}</span>
          <strong>{component.name}</strong>
          <span>{component.price}€</span>
        </div>
        <p className="component-subtitle">{component.specs}</p>
      </li>
    ));
  };

  const showDetails = (build) => {
    setSelectedBuild(build);
  };

  const closeDetails = () => {
    setSelectedBuild(null);
  };

  if (loading) {
    return (
      <div className="page-card">
        <h2>Minhas Builds</h2>
        <p className="card-copy">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-card">
        <h2>Minhas Builds</h2>
        <p className="card-copy">Para ver e guardar as suas builds, faça login ou crie conta.</p>
        <div className="auth-actions">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Criar Conta</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-card">
      <div className="build-header-row">
        <div>
          <h2>Minhas Builds</h2>
          <p className="card-copy">Aqui estão as builds guardadas para a sua conta.</p>
        </div>
        {builds.length > 0 && (
          <button className="secondary" onClick={clearBuilds}>Limpar todas</button>
        )}
      </div>

      {builds.length === 0 ? (
        <div>
          <p className="card-copy">Ainda não guardaste nenhuma build. Crie uma build e salve-a para encontrá-la aqui.</p>
          <Link to="/build" className="nav-link">Criar Build</Link>
        </div>
      ) : (
        <div className="build-list">
          {builds.map(build => (
            <article key={build.id} className="result-card">
              <div className="result-header">
                <div>
                  <h3>{build.type === 'gaming' ? 'Gaming Build' : 'Office Build'}</h3>
                  <p className="card-copy">Salva em {new Date(build.savedAt).toLocaleString()}.</p>
                </div>
                <div className="build-summary">
                  <p><strong>Orçamento:</strong> {build.budget}€</p>
                  <p><strong>Total:</strong> {build.totalPrice}€</p>
                  <p className="card-copy">Saldo restante: {build.remainingBudget ?? 0}€</p>
                </div>
              </div>

              <ul className="component-list">
                {renderComponentList(build.components)}
              </ul>

              <div className="build-actions">
                <button className="secondary" onClick={() => showDetails(build)}>Ver Detalhes</button>
                <button className="secondary" onClick={() => removeBuild(build.id)}>Remover</button>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedBuild && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{selectedBuild.type === 'gaming' ? 'Gaming Build' : 'Office Build'} - Detalhes</h2>
                <p className="card-copy">Tudo o que você precisa saber sobre essa configuração salva.</p>
              </div>
              <button className="close-btn" onClick={closeDetails}>&times;</button>
            </div>

            <div className="modal-row">
              <div>
                <p><strong>Orçamento:</strong> {selectedBuild.budget}€</p>
                <p><strong>Total estimado:</strong> {selectedBuild.totalPrice}€</p>
                <p><strong>Saldo restante:</strong> {selectedBuild.remainingBudget ?? 0}€</p>
              </div>
              <div>
                <p><strong>Salva em:</strong></p>
                <p>{new Date(selectedBuild.savedAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="modal-specs">
              <h3>Componentes</h3>
              <ul className="component-list">
                {renderComponentList(selectedBuild.components)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
