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
          <h2>Os melhores componentes para montar seu PC</h2>
          <p className="hero-text">
            Chegue mais rápido à configuração ideal com sugestões de builds e compatibilidade garantida.
          </p>
          <div className="hero-actions">
            <a href="/components" className="store-action primary">Ver Componentes</a>
            <a href="/build" className="store-action secondary">Montar Build</a>
          </div>
        </div>
      </section>

      <section className="page-card featured-card">
        <div className="section-heading">
          <div>
            <h2>Componentes em destaque</h2>
            <p>Produtos com ótima avaliação e preço competitivo.</p>
          </div>
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
                <a href="/build" className="store-action primary">Salvar Build</a>
                <a href="/components" className="store-action secondary">Ver detalhes</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
