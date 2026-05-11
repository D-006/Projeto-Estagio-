import { useState } from 'react';

import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      setError('Falha ao fazer login. Verifique e tente novamente.');
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login} disabled={loading}>
        {loading ? 'Entrando...' : 'Login'}
      </button>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </div>
  );
}

