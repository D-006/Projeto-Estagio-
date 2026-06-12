import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { persistAuthTokens } from '../lib/auth.js';
import { api } from '../services/api.js';

export default function Login() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const success = location.state?.success || '';
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/api/auth/login', { email, password });
      persistAuthTokens({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      navigate('/', { state: { success: 'Login efetuado com sucesso!' } });
    } catch (err) {
      setError('Falha ao fazer login. Verifique e tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-card">
      <h2>Login</h2>
      <p className="card-copy">Digite suas credenciais para acessar sua conta e salvar suas builds.</p>
      <p className="card-copy" style={{ marginTop: '12px', fontStyle: 'italic' }}>
        Sessão válida por 3 horas. Após esse período, será necessário fazer login novamente.
      </p>

      <input
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="form-control"
        placeholder="Senha"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button className="primary" onClick={login} disabled={loading}>
        {loading ? 'Entrando...' : 'Login'}
      </button>

      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
    </div>
  );
}

