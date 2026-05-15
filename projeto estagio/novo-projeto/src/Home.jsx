
const featuredProducts = [
  {
    title: 'Intel Core i7-13700K',
    category: 'Processador',
    price: 'R$ 2.499,00',
    description: 'Alto desempenho para multitarefa, edição e jogos em alta resolução.',
  },
  {
    title: 'NVIDIA RTX 4070',
    category: 'Placa de Vídeo',
    price: 'R$ 3.399,00',
    description: 'Ray-tracing avançado e excelente performance em 1440p.',
  },
  {
    title: 'SSD NVMe 1TB',
    category: 'Armazenamento',
    price: 'R$ 689,00',
    description: 'Inicialização rápida e carregamento ágil para jogos e aplicativos.',
  },
];

export default function Home() {
  return (
    <div className="home-grid home-store">
      <section className="store-hero page-card">
        <div className="store-hero-copy">
          <p className="deal-label">Oferta do dia</p>
          <h2>Os melhores componentes para montar seu PC agora</h2>
          <p className="hero-text">
            Chegue mais rápido à configuração ideal com sugestões de builds, ofertas e compatibilidade garantida.
          </p>
          <div className="hero-actions">
            <a href="/components" className="store-action primary">Ver Ofertas</a>
            <a href="/build" className="store-action secondary">Montar Build</a>
          </div>
        </div>

        <div className="store-deal-banner">
          <span className="deal-label">Super Oferta</span>
          <h3>Kit Gamer Premium</h3>
          <p>RTX 4070 + SSD NVMe 1TB com desconto especial por tempo limitado.</p>
          <div className="deal-price">R$ 3.799,00</div>
          <a href="/build" className="store-action primary">Comprar Agora</a>
        </div>
      </section>

      <section className="store-categories page-card">
        <div className="section-heading">
          <div>
            <h2>Departamentos</h2>
            <p>Explore categorias populares.</p>
          </div>
        </div>
        <div className="category-row">
          {['Processadores', 'Placas de Vídeo', 'SSDs', 'Gabinetes', 'Coolers', 'Memórias'].map((category) => (
            <div key={category} className="category-chip">{category}</div>
          ))}
        </div>
      </section>

      <section className="page-card featured-card">
        <div className="section-heading">
          <div>
            <h2>Mais vendidos</h2>
            <p>Produtos com ótima avaliação e preço competitivo.</p>
          </div>
          <span className="tag-badge">Economize agora</span>
        </div>

        <div className="home-cards">
          {featuredProducts.map((product) => (
            <article key={product.title} className="home-card product-card">
              <div className="product-header">
                <div>
                  <h3 className="card-title">{product.category}</h3>
                  <p className="product-name">{product.title}</p>
                </div>
                <div className="product-price">{product.price}</div>
              </div>
              <p className="card-copy">{product.description}</p>
              <div className="product-rating">4,8 ★</div>
              <div className="product-actions">
                <a href="/build" className="store-action primary">Adicionar ao carrinho</a>
                <a href="/components" className="store-action secondary">Ver detalhes</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

