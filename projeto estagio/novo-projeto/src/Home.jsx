
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div>
      <h1>PC Builder</h1>
      <Link to="/build">Criar Build</Link>
      <br />
      <Link to="/components">Ver Componentes</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
}

