import { fundadores } from './dadosSobre';

/**
 * FundadoresGrid — Grid dos 14 sócios fundadores da ACB
 * Migrado de sobre.js (função loadGallery)
 */
const FundadoresGrid = () => {
  return (
    <section className="fundadores">
      <div className="container">
        <h2 className="section-title text-center animacao-entrada">
          Nossos Fundadores
        </h2>
        <div className="yellow-line animacao-entrada" />

        <div className="fundadores-grid">
          {fundadores.map((fundador, index) => (
            <div className="fundador-card" key={index}>
              <img
                src={fundador.img}
                alt={`Imagem do conselheiro ${fundador.nome}`}
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
