import { Link } from 'react-router-dom';
import { useAnimacaoEntrada } from '../../hooks/useAnimacaoEntrada';
import IndicadoresSection from './IndicadoresSection';
import ArtigosSection from './ArtigosSection';
import heroImg from '../../images/hero.png';
import './Home.css';

const Home = () => {
  useAnimacaoEntrada();

  return (
    <main id="conteudo-principal">

      {/* ===== HERO ===== */}
      <section className="hero-home">
        <div className="container hero-container">
          <div className="hero-content animacao-entrada" data-delay="1">
            <span className="hero-tag">Conselho de Excelência</span>
            <h1>Governança que transforma empresas. Conselheiros que transformam o Brasil.</h1>
            <p>
              O maior portal de governança corporativa do país. Conteúdo, eventos e networking para
              profissionais que buscam impacto no conselho de administração.
            </p>
            <div className="hero-buttons">
              <Link to="/associe-se" className="btn btn--primary">
                Seja um Associado<i className="fas fa-arrow-right" />
              </Link>
              <Link to="/newsletter" className="btn btn--outline">Explore</Link>
            </div>
          </div>
          <div className="hero-image-wrapper animacao-entrada" data-delay="2">
            <div className="hero-image-placeholder">
              <img src={heroImg} alt="Governança Corporativa" className="placeholder-img" />
            </div>
            <div className="hero-quote">
              <p>&quot;A inovação começa na mesa do conselho, guiando a empresa para o futuro.&quot;</p>
            </div>
          </div>
        </div>
        <div className="hero-bg-map" />
      </section>

      {/* ===== INDICADORES ===== */}
      <IndicadoresSection />

      {/* ===== NOTÍCIAS ===== */}
      <ArtigosSection />

      {/* ===== EVENTOS & WEBINARS ===== */}
      <section className="events-section bg-light animacao-entrada" data-delay="1">
        <div className="container">
          <div className="section-header--left">
            <h2>Eventos &amp; Webinars</h2>
            <div className="section-title-bar" />
          </div>
          <div className="events-grid">
            <div className="event-card">
              <div className="event-header">
                <div className="event-date">
                  <span className="day">12</span>
                  <span className="month">Jul</span>
                </div>
                <div className="event-meta">
                  <span className="type"><i className="fas fa-video" /> Online</span>
                  <span className="time"><i className="far fa-clock" /> 19h às 21h</span>
                </div>
              </div>
              <h3>Seminário: O Papel do Conselho Digital</h3>
              <p>Discussão sobre a transformação digital nas esferas mais altas da administração e as novas responsabilidades.</p>
              <a href="#" className="event-link">Inscreva-se <i className="fas fa-arrow-right" /></a>
            </div>

            <div className="event-card">
              <div className="event-header">
                <div className="event-date">
                  <span className="day">05</span>
                  <span className="month">Ago</span>
                </div>
                <div className="event-meta">
                  <span className="type"><i className="fas fa-map-marker-alt" /> Presencial</span>
                  <span className="time"><i className="far fa-clock" /> 09h às 18h</span>
                </div>
              </div>
              <h3>Workshop: Governança Ambiental</h3>
              <p>Práticas ESG para conselheiros. Como integrar sustentabilidade na estratégia de longo prazo da empresa.</p>
              <a href="#" className="event-link">Saiba mais <i className="fas fa-arrow-right" /></a>
            </div>

            <div className="event-card">
              <div className="event-header">
                <div className="event-date">
                  <span className="day">22</span>
                  <span className="month">Ago</span>
                </div>
                <div className="event-meta">
                  <span className="type"><i className="fas fa-video" /> Online</span>
                  <span className="time"><i className="far fa-clock" /> 18h às 20h</span>
                </div>
              </div>
              <h3>Webinar: Tendências para 2025</h3>
              <p>Um painel com especialistas debatendo o futuro da governança corporativa no cenário brasileiro e global.</p>
              <a href="#" className="event-link">Inscreva-se <i className="fas fa-arrow-right" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section animacao-entrada" data-delay="1">
        <div className="cta-overlay" />
        <div className="container cta-content">
          <h2>
            Seu lugar na mesa principal da{' '}
            <span className="highlight">ACBrasil</span>
          </h2>
          <p>
            Junte-se a uma rede exclusiva de profissionais, conselheiros e especialistas. Tenha
            acesso a conteúdos premium, eventos restritos e oportunidades únicas de networking.
          </p>
          <Link to="/associe-se" className="btn btn--accent btn-yellow">Seja um Associado</Link>
        </div>
      </section>

    </main>
  );
};

export default Home;