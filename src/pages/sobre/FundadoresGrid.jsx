import { fundadores } from './dadosSobre';

/**
 * FundadoresGrid — Grid dos 14 sócios fundadores da ACB
 * Migrado de sobre.js (função loadGallery)
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
            <div className="fundador-card" key={index}>
              <img
                src={fundador.img}
                alt=""
                loading="lazy"
              />
              <h3 className="name">{fundador.nome}</h3>
              <p className="role">SÓCIO FUNDADOR</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundadoresGrid;
