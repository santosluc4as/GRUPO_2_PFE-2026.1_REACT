import { Link } from 'react-router-dom';
import { fundadores } from './dadosSobre';

/**
 * FundadoresGrid — Grid dos 14 sócios fundadores da ACB
 * Cada card é clicável e leva à página de perfil do conselheiro.
 */
const FundadoresGrid = () => {
  return (
    <section className="fundadores">
      <div className="container">
        <div className="animacao-entrada">
          <h2 className="section-title text-center">
            Nossos Fundadores
          </h2>
          <div className="yellow-line" />
        </div>

        <div className="fundadores-grid">
          {fundadores.map((fundador, index) => (
            <Link
              to={`/sobre/${fundador.slug}`}
              className="fundador-card"
              key={index}
              aria-label={`Ver perfil de ${fundador.nomeCompleto}`}
            >
              <img
                src={fundador.img}
                alt=""
                loading="lazy"
              />
              <h3 className="name">{fundador.nome}</h3>
              <p className="role">SÓCIO FUNDADOR</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundadoresGrid;
