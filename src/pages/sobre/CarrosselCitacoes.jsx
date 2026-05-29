import { useState, useEffect, useCallback } from 'react';
import { citacoesSocios } from './dadosSobre';

/**
 * CarrosselCitacoes — Carrossel "Palavra dos Sócios"
 * 
 * Migrado de sobre.js:
 * - Auto-play com intervalo de 10 segundos
 * - Pausa ao passar o mouse (mouseenter/mouseleave)
 * - Dots clicáveis para navegação manual
 * - Transição suave de opacidade ao trocar citação
 */
const AUTO_PLAY_TIME = 10000;

const CarrosselCitacoes = () => {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [opacidade, setOpacidade] = useState(1);

  const citacao = citacoesSocios[indiceAtual];

  // Troca de citação com fade
  const irPara = useCallback((novoIndice) => {
    if (novoIndice === indiceAtual) return;
    setOpacidade(0);
    setTimeout(() => {
      setIndiceAtual(novoIndice);
      setOpacidade(1);
    }, 300);
  }, [indiceAtual]);

  // Auto-play: troca a cada 10 segundos
  useEffect(() => {
    if (pausado) return;

    const timer = setInterval(() => {
      const proximoIndice = (indiceAtual + 1) % citacoesSocios.length;
      irPara(proximoIndice);
    }, AUTO_PLAY_TIME);

    return () => clearInterval(timer);
  }, [indiceAtual, pausado, irPara]);

  return (
    <section className="palavra">
      <div className="container text-center">
        <span className="subtitle animacao-entrada">PALAVRA DOS SÓCIOS</span>
        <h2 className="title animacao-entrada">Vozes que Moldam a ACB</h2>
        <div className="yellow-line animacao-entrada" />

        <div className="carousel-container animacao-entrada" data-delay="2">
          <div
            className="quote-card"
            style={{ opacity: opacidade }}
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
          >
            <div className="quote-avatar">
              <img
                src={citacao.img}
                alt={citacao.name}
                loading="lazy"
              />
            </div>
            <div className="quote-content">
              <i className="ph-fill ph-quotes" />
              <blockquote>{`"${citacao.quote}"`}</blockquote>
              <div className="quote-author">
                <h4>{citacao.name}</h4>
                <p>SÓCIO FUNDADOR</p>
              </div>
            </div>
          </div>

          <div className="carousel-dots">
            {citacoesSocios.map((_, index) => (
              <span
                key={index}
                className={`dot${index === indiceAtual ? ' active' : ''}`}
                onClick={() => irPara(index)}
                role="button"
                tabIndex={0}
                aria-label={`Citação ${index + 1}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') irPara(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarrosselCitacoes;
