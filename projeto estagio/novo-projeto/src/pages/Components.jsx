import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

const typeLabels = {
  all: 'Todos',
  favorite: 'Favoritos',
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
  const [priceFilter, setPriceFilter] = useState('all');
  const [favorites, setFavorites] = useState(() => loadFavorites());
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/api/components');
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

  const toggleFavorite = (id, event) => {
    event?.stopPropagation();
    const updated = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
    setFavorites(updated);
    saveFavorites(updated);
  };

  const filteredData = data.filter(comp => {
    const search = searchTerm.toLowerCase();
    const key = comp._id ?? comp.id ?? comp.name;
    const matchesSearch = comp.name.toLowerCase().includes(search)
      || comp.description?.toLowerCase().includes(search)
      || comp.specifications?.toLowerCase().includes(search);
    const matchesFavorites = filterType !== 'favorite' || favorites.includes(key);
    const matchesType = filterType === 'all' || filterType === 'favorite' || comp.type === filterType;
    const price = Number(comp.price ?? 0);
    const matchesPrice = priceFilter === 'all'
      || (priceFilter === 'under100' && price <= 100)
      || (priceFilter === '100-300' && price > 100 && price <= 300)
      || (priceFilter === '300-600' && price > 300 && price <= 600)
      || (priceFilter === 'over600' && price > 600);
    return matchesSearch && matchesFavorites && matchesType && matchesPrice;
  });

  const groupedData = filterType === 'favorite'
    ? { favorite: filteredData }
    : typeOrder.reduce((acc, type) => {
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
        <select
          className="form-control filter-select"
          value={priceFilter}
          onChange={e => setPriceFilter(e.target.value)}
        >
          <option value="all">Todos os preços</option>
          <option value="under100">Até 100€</option>
          <option value="100-300">100€ - 300€</option>
          <option value="300-600">300€ - 600€</option>
          <option value="over600">Mais de 600€</option>
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

                      <div className="component-image-wrapper">
                        {c.image_url ? (
                          <img
                            src={c.image_url}
                            alt={c.image_alt || c.name}
                            loading="lazy"
                            onError={(e) => {
                              // evita ficar preso se a URL falhar
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="component-image-placeholder">Sem imagem</div>
                        )}
                      </div>
                      <div className="component-card-header">
                        <div>
                          <h3>{c.name}</h3>
                          <p className="component-subtitle">
                            {c.manufacturer ? `${c.manufacturer} • ` : ''}{c.specifications || c.description}
                          </p>
                        </div>
                        <button
                          className={`favorite-btn${isFavorite ? ' active' : ''}`}
                          onClick={e => toggleFavorite(key, e)}
                          aria-label={isFavorite ? 'Remover favorito' : 'Adicionar aos favoritos'}
                        >
                          {isFavorite ? '★' : '☆'}
                        </button>
                      </div>
                      <div className="component-meta">
                        {c.tdp && <span>Consumo: {c.tdp}</span>}
                        {c.rating && <span>Avaliação: {c.rating.toFixed(1)} / 5</span>}
                        {c.rating && <span className="component-rating">{'★'.repeat(Math.round(c.rating))}{'☆'.repeat(5 - Math.round(c.rating))}</span>}
                      </div>
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
            {selected.description || selected.specifications ? (
              <p className="card-copy">{selected.description || selected.specifications}</p>
            ) : null}
            <div className="modal-row">
              <div>
                <strong>Categoria:</strong> {typeLabels[selected.type]}
              </div>
              <div>
                <strong>Preço:</strong> {selected.price}€
              </div>
            </div>
            <div className="modal-row">
              {selected.manufacturer && (
                <div><strong>Fabricante:</strong> {selected.manufacturer}</div>
              )}
              {selected.tdp && (
                <div><strong>Consumo:</strong> {selected.tdp}</div>
              )}
              {selected.rating && (
                <div><strong>Avaliação:</strong> {selected.rating.toFixed(1)} / 5</div>
              )}
            </div>
            {selected.rating && (
              <p className="component-rating">Avaliação: {'★'.repeat(Math.round(selected.rating))}{'☆'.repeat(5 - Math.round(selected.rating))} ({selected.rating.toFixed(1)})</p>
            )}
            {selected.image_url && (
              <div className="modal-image-wrapper">
                <img src={selected.image_url} alt={selected.image_alt || selected.name} />
              </div>
            )}
            {selected.specifications && (
              <div className="modal-specs">
                <strong>Especificações:</strong>
                <p>{selected.specifications}</p>
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

