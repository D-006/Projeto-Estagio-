import { useEffect, useState } from 'react';

import axios from 'axios';

export default function Components() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('http://localhost:5000/api/components');
        if (isMounted) setData(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (isMounted) {
          setError('Falha ao carregar componentes. Verifique o backend e tente novamente.');
          console.error(err);

        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h1>Componentes</h1>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!loading && !error && (
        <>
          {data.map(c => {
            const key = c._id ?? c.id ?? c.name;
            return (
              <div key={key}>
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <p>{c.price}€</p>
                {c.linkCompra ? (
                  <a href={c.linkCompra} target="_blank" rel="noreferrer">
                    Comprar
                  </a>
                ) : null}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

