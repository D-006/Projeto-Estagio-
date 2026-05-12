import { useEffect, useState } from 'react';
import axios from 'axios';

const typeLabels = {
  all: 'Todos',
  cpu: 'CPU',
  gpu: 'GPU',
  ram: 'RAM',
  storage: 'Armazenamento',
  motherboard: 'Motherboard',
  psu: 'Fonte',
  case: 'Gabinete'
};

const typeOrder = ['cpu', 'gpu', 'ram', 'storage', 'motherboard', 'psu', 'case'];

const STORAGE_KEY = 'favoriteComponents';

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function Components() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);
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
    setFavorites(loadFavorites());

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFavorite = (id, event) => {
    event?.stopPropagation();
    const updated = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
    setFavorites(updated);
    saveFavorites(updated);
  };

  const filteredData = data.filter(comp => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = comp.name.toLowerCase().includes(search) || (comp.description?.toLowerCase().includes(search));
    const matchesType = filterType === 'all' || comp.type === filterType;
    return matchesSearch && matchesType;
  });

  const groupedData = typeOrder.reduce((acc, type) => {
    const items = filteredData.filter(comp => comp.type === type);
    if (items.length > 0) acc[type] = items;
    return acc;
  }, {});

  return (
    <div className="page-card">
      <h2>Componentes</h2>
      <p className="card-copy">Explore os componentes disponíveis, pesquise por nome e filtre por categoria.</p>

      <div className="filter-row">
        <input
          className="form-control search-input"
          placeholder="Pesquisar componente..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="form-control filter-select"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
        >
          {Object.entries(typeLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {loading && <p>Carregando componentes...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && filteredData.length === 0 && (
        <p className="card-copy">Nenhum componente encontrado para os critérios selecionados.</p>
      )}

      {!loading && !error && filteredData.length > 0 && (
        <>
          {Object.entries(groupedData).map(([type, items]) => (
            <section key={type} className="category-section">
              <div className="category-title-row">
                <h3 className="category-title">{typeLabels[type]}</h3>
                <span className="category-count">{items.length} itens</span>
              </div>
              <div className="component-list">
                {items.map(c => {
                  const key = c._id ?? c.id ?? c.name;
                  const isFavorite = favorites.includes(key);
                  return (
                    <article key={key} className="component-card" onClick={() => setSelected(c)}>
                      <div className="component-card-header">
                        <div>
                          <h3>{c.name}</h3>
                          <p className="component-subtitle">{typeLabels[c.type]}</p>
                        </div>
                        <button
                          className={`favorite-btn${isFavorite ? ' active' : ''}`}
                          onClick={e => toggleFavorite(key, e)}
                          aria-label={isFavorite ? 'Remover favorito' : 'Adicionar aos favoritos'}
                        >
                          {isFavorite ? '★' : '☆'}
                        </button>
                      </div>
                      <p>{c.description}</p>
                      <p className="component-price">{c.price}€</p>
                      {c.linkCompra ? (
                        <a href={c.linkCompra} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
                          Comprar
                        </a>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </>
      )}

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selected.name}</h3>
              <button className="close-btn" onClick={() => setSelected(null)}>×</button>
            </div>
            <p className="card-copy">{selected.description}</p>
            <div className="modal-row">
              <div>
                <strong>Categoria:</strong> {typeLabels[selected.type]}
              </div>
              <div>
                <strong>Preço:</strong> {selected.price}€
              </div>
            </div>
            {selected.specs && (
              <div className="modal-specs">
                <strong>Especificações:</strong>
                <p>{selected.specs}</p>
              </div>
            )}
            {selected.linkCompra && (
              <a className="modal-link" href={selected.linkCompra} target="_blank" rel="noreferrer">
                Ver link de compra
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

