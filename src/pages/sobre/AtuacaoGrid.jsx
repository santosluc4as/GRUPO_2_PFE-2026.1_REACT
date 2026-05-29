import { areasAtuacao } from './dadosSobre';

/**
 * AtuacaoGrid — Grid de 9 cards com as especialidades/áreas de atuação da ACB
 * Os cards de Liderança tem layout especial (imagem de fundo + texto na base)
 */
const AtuacaoGrid = () => {
  return (
    <section className="atuacao">
      <div className="container">
        <div className="atuacao-header animacao-entrada">
          <div className="atuacao-title-col">
            <span className="subtitle">O QUE FAZEMOS</span>
            <h2 className="title">
              Nossa Atuação e<br />Especialidades
            </h2>
            <div className="yellow-line" />
          </div>
          <div className="atuacao-text-col">
            <p>
              Nós da Associação de Conselheiros do Brasil (ACB) temos um corpo
              de executivos com larga experiência e com reputação para
              implementar ou desenvolver conselhos corporativos. Também
              auxiliamos empresas, conselhos e comitês executivos na
              implementação de boards, no desenvolvimento e desdobramento de
              estratégia e em temas mais específicos, como:
            </p>
          </div>
        </div>

        <div className="grid-atuacao">
          {areasAtuacao.map((area, index) => (
            <div
              className={`card-atuacao ${area.extraClasse} ${area.corClasse} animacao-entrada`}
              data-delay={((index % 4) + 1).toString()}
              key={index}
            >
              <i className={area.icone} />
              {area.isLideranca ? (
                <div className="card-content-bottom">
                  <h3>{area.titulo}</h3>
                  <p>{area.descricao}</p>
                </div>
              ) : (
                <>
                  <h3>{area.titulo}</h3>
                  <p>{area.descricao}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtuacaoGrid;
