import { useState } from 'react';

import axios from 'axios';

export default function Build() {
  const [budget, setBudget] = useState('');
  const [type, setType] = useState('gaming');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/build/generate', { budget, type });
      setResult(res.data);
    } catch (err) {
      setError('Falha ao gerar build. Verifique o backend e tente novamente.');
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Criar Build</h1>
      <input placeholder="Budget" onChange={e => setBudget(e.target.value)} />

      <select onChange={e => setType(e.target.value)}>
        <option value="gaming">Gaming</option>
        <option value="office">Office</option>
      </select>

      <button onClick={generate} disabled={loading}>
        {loading ? 'Gerando...' : 'Gerar'}
      </button>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {result && (
        <div>
          <h2>Resultado</h2>
          <pre>{JSON.stringify(result.components, null, 2)}</pre>
          <p>Total: {result.totalPrice}€</p>
        </div>
      )}
    </div>
  );
}

