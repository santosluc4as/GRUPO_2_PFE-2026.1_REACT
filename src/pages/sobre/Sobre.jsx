import './Sobre.css';
import { useAnimacaoEntrada } from '../../hooks/useAnimacaoEntrada';
import { timeAcb } from './dadosSobre';
import FundadoresGrid from './FundadoresGrid';
import AtuacaoGrid from './AtuacaoGrid';
import CarrosselCitacoes from './CarrosselCitacoes';

/**
 * Sobre — Página "Sobre Nós" da ACBrasil
 *
 * Seções:
 *  1. Hero (texto institucional + imagem)
 *  2. Separador azul
 *  3. Fundadores (grid de 14 sócios)
 *  4. Atuação (grid de 9 especialidades)
 *  5. Carrossel de citações dos sócios
 */
const Sobre = () => {
  // Ativa animações de entrada via Intersection Observer
  useAnimacaoEntrada();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-wrapper">
        <div className="container hero-container">
          <div className="hero-content animacao-entrada">
            <span className="subtitle">QUEM SOMOS</span>
            <h1 className="title">Nossa História e Legado</h1>
            <div className="hero-text">
              <p>
                Fundada em 2022, a Associação de Conselheiros do Brasil – ACB –
                nasce com intuito de despertar a consciência sobre a importância
                e a necessidade da adoção da governança, influenciando e
                transformando positivamente a realidade das empresas brasileiras,
                em especial as PMEs.
              </p>
              <p>
                Aliamos experiência, credibilidade e conhecimento, para orientar
                e ajudar a construir as melhores práticas de governança
                corporativa e otimização de processos.
              </p>
              <p>
                Acreditamos que disseminar o conhecimento, educar e incluir as
                PMEs no universo da governança corporativa, é o caminho para o
                desenvolvimento e crescimento forte e sustentável do mercado
                brasileiro.
              </p>
            </div>
            <div className="mission-card animacao-entrada" data-delay="2">
              <i className="ph-fill ph-sparkle" />
              <p>
                Nossa Missão: Influenciar e transformar as empresas brasileiras,
                de todos os portes, por meio da governança.
              </p>
            </div>
          </div>
          <div className="hero-image-col animacao-entrada" data-delay="3">
            <img
              src={timeAcb}
              alt="Equipe em acordo"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ===== SEPARADOR ===== */}
      <div className="blue-separator" />

      {/* ===== FUNDADORES ===== */}
      <FundadoresGrid />

      {/* ===== ATUAÇÃO ===== */}
      <AtuacaoGrid />

      {/* ===== PALAVRA DOS SÓCIOS ===== */}
      <CarrosselCitacoes />
    </>
  );
};

export default Sobre;