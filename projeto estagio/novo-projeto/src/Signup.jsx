import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const signup = async () => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (!email || password.length < 6) {
      setError('Email válido e senha com pelo menos 6 caracteres são necessários.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      setSuccess('Conta criada com sucesso! Faça login para continuar.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao criar conta. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-card">
      <h2>Criar Conta</h2>
      <p className="card-copy">Crie uma nova conta para salvar suas builds e acompanhar recomendações personalizadas.</p>

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
      <input
        className="form-control"
        placeholder="Confirmar Senha"
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />

      <button className="primary" onClick={signup} disabled={loading}>
        {loading ? 'Criando...' : 'Criar Conta'}
      </button>

      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
    </div>
  );
}
