import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

export default function Build() {
  const [budget, setBudget] = useState('');
  const [type, setType] = useState('gaming');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  const currentUser = getCurrentUser();

  const generate = async () => {
    const budgetNum = parseInt(budget, 10);
    if (isNaN(budgetNum) || budgetNum <= 0) {
      setError('Por favor, insira um orçamento válido.');
      return;
    }

    setLoading(true);
    setError('');
    setSaveMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/build/generate', { budget: budgetNum, type });
      setResult(res.data);
    } catch (err) {
      setError('Falha ao gerar build. Verifique o backend e tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveBuild = () => {
    if (!currentUser) {
      setError('Faça login para salvar esta build.');
      return;
    }

    const savedBuildsKey = `savedBuilds_${currentUser.email}`;
    const storedBuilds = JSON.parse(localStorage.getItem(savedBuildsKey) || '[]');
    const newBuild = {
      id: Date.now(),
      budget,
      type,
      totalPrice: result.totalPrice,
      remainingBudget: result.remainingBudget,
      components: result.components,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem(savedBuildsKey, JSON.stringify([newBuild, ...storedBuilds]));
    setSaveMessage('Build salva com sucesso! Pode ver em Minhas Builds.');
  };

  const editBuild = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const buildTypeLabel = result && (result.type === 'office' ? 'Office' : 'Gaming');
  const componentEntries = result ? Object.entries(result.components || {}) : [];

  return (
    <div className="page-card">
      <h2>Criar Build</h2>
      <p className="card-copy">
        Informe o orçamento e selecione o tipo de uso para receber uma sugestão de componentes personalizada.
      </p>

      <input
        className="form-control"
        placeholder="Orçamento em euros"
        value={budget}
        onChange={e => setBudget(e.target.value)}
      />

      <select className="form-control" value={type} onChange={e => setType(e.target.value)}>
        <option value="gaming">Gaming</option>
        <option value="office">Office</option>
      </select>

      <button className="primary" onClick={generate} disabled={loading}>
        {loading ? 'Gerando...' : 'Gerar Build'}
      </button>

      {error && <p className="error-text">{error}</p>}
      {saveMessage && <p className="success-text">{saveMessage}</p>}

      {result && (
        <section className="result-card">
          <div className="result-header">
            <div>
              <h2>Build recomendada</h2>
              <p className="card-copy">
                Esta configuração foi criada para {result.type === 'office' ? 'trabalho e produtividade' : 'jogos de alto desempenho'}.
              </p>
            </div>
            <div className="build-summary">
              <p><strong>Tipo:</strong> {buildTypeLabel}</p>
              <p><strong>Orçamento:</strong> {result.budget}€</p>
              <p className="success-text"><strong>Total estimado:</strong> {result.totalPrice}€</p>
              <p className="card-copy">Saldo restante: {result.remainingBudget}€</p>
            </div>
          </div>

          <ul className="component-list">
            {componentEntries.map(([category, component]) => (
              <li key={component.id} className="component-item">
                <div className="component-item-title">
                  <span className="component-type">{category.toUpperCase()}</span>
                  <strong>{component.name}</strong>
                  <span>{component.price}€</span>
                </div>
                <p className="component-subtitle">{component.specs}</p>
              </li>
            ))}
          </ul>

          <div className="build-actions">
            {currentUser ? (
              <button className="secondary" onClick={saveBuild}>Salvar Build</button>
            ) : (
              <p className="card-copy">
                Faça <Link to="/login">login</Link> ou <Link to="/signup">crie conta</Link> para salvar suas builds.
              </p>
            )}
            <button className="secondary" onClick={editBuild}>Editar Build</button>
          </div>
        </section>
      )}
    </div>
  );
}

