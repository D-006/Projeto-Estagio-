
export default function Home() {
  return (
    <div className="home-grid">
      <section className="page-card">
        <h2>O que é o PC Builder</h2>
        <p className="card-copy">
          Este site ajuda a montar computadores com sugestões de builds baseadas no uso e no orçamento.
          Aqui você encontra exemplos de configurações, componentes compatíveis e uma forma simples de planejar sua próxima máquina.
        </p>
        <p className="card-copy">
          Confira abaixo exemplos reais de builds e veja como diferentes peças se combinam para cada perfil de usuário.
        </p>
      </section>

      <div className="home-cards">
        <article className="home-card">
          <h3 className="card-title">Build Gamer</h3>
          <p className="card-copy">Um equilíbrio entre desempenho em jogos e custo-benefício.</p>
          <ul>
            <li>CPU: Intel Core i5-12600K</li>
            <li>GPU: NVIDIA RTX 4060</li>
            <li>RAM: 16GB DDR4</li>
            <li>Armazenamento: 1TB NVMe SSD</li>
          </ul>
        </article>

        <article className="home-card">
          <h3 className="card-title">Build de Escritório</h3>
          <p className="card-copy">Configuração ideal para produtividade, escritório e uso diário confortável.</p>
          <ul>
            <li>CPU: AMD Ryzen 5 5600G</li>
            <li>GPU: Gráficos integrados Radeon</li>
            <li>RAM: 16GB DDR4</li>
            <li>Armazenamento: 500GB SSD</li>
          </ul>
        </article>
      </div>
    </div>
  );
}

