
export default function Home() {
  return (
    <div className="home-grid">
      <section className="page-card">
        <h2>O que é o PC Builder</h2>
        <p className="card-copy">
          Este site ajuda a montar computadores com sugestões de builds baseadas no uso e no orçamento.
          Aqui você encontra componentes compatíveis e uma forma simples de planejar sua próxima máquina.
        </p>
        <p className="card-copy">
          Explore componentes selecionados para montagem, consulte especificações e descubra o que combina melhor com seu perfil.
        </p>
      </section>

      <div className="home-cards">
        <article className="home-card">
          <h3 className="card-title">Processador</h3>
          <p className="card-copy">Intel Core i7-13700K — potência para tarefas exigentes e jogos em alta taxa de quadros.</p>
          <ul>
            <li>Threads: 16</li>
            <li>Base / Turbo: 3.4 / 5.4 GHz</li>
            <li>Cache: 30MB</li>
            <li>Soquete: LGA1700</li>
          </ul>
        </article>

        <article className="home-card">
          <h3 className="card-title">Placa de Vídeo</h3>
          <p className="card-copy">NVIDIA RTX 4070 — desempenho sólido em 1440p com recursos de ray-tracing e DLSS.</p>
          <ul>
            <li>Memória: 12GB GDDR6X</li>
            <li>RT Cores: 3ª geração</li>
            <li>Consumo: 200W</li>
            <li>Resfriamento premium</li>
          </ul>
        </article>

        <article className="home-card">
          <h3 className="card-title">Armazenamento</h3>
          <p className="card-copy">SSD NVMe de 1TB — carregamento rápido de sistema e aplicativos, ideal para produtividade e gaming.</p>
          <ul>
            <li>Interface: PCIe 4.0</li>
            <li>Leitura seq.: 7.000 MB/s</li>
            <li>Gravação seq.: 5.000 MB/s</li>
            <li>Confiabilidade: 1.000 TBW</li>
          </ul>
        </article>
      </div>
    </div>
  );
}

