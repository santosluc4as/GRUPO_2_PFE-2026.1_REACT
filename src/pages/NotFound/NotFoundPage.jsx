import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAnimacaoEntrada } from '../../hooks/useAnimacaoEntrada';
import './NotFoundStyle.css';

const atalhos = [
  { to: '/', label: 'Voltar para a Home', icon: 'fa-solid fa-house' },
  { to: '/sobre', label: 'Conhecer a ACB', icon: 'fa-solid fa-building-columns' },
  { to: '/insights', label: 'Ler insights', icon: 'fa-solid fa-chart-line' },
];

const NotFoundPage = () => {

  useAnimacaoEntrada();

  return (
    <main id="conteudo-principal" className="notfound-page">
      <section className="notfound-hero">
        <div className="container notfound-container">
          <div className="notfound-content">
            <span className="notfound-tag animacao-entrada">Página não encontrada</span>
            <h1 className="notfound-title animacao-entrada" data-delay="1">
              A rota solicitada não existe.
            </h1>
            <p className="notfound-text animacao-entrada" data-delay="2">
              Talvez o endereço tenha mudado ou a página ainda não esteja disponível.
              Use os atalhos abaixo para continuar navegando pelo site da ACBrasil.
            </p>

            <div className="notfound-actions animacao-entrada" data-delay="3">
              <Link to="/" className="btn btn--primary notfound-btn">
                <i className="fa-solid fa-house" />
                Voltar ao início
              </Link>
              <Link to="/sobre" className="btn btn--outline notfound-btn">
                <i className="fa-solid fa-circle-info" />
                Sobre nós
              </Link>
            </div>
          </div>

          <aside className="notfound-visual animacao-entrada" data-delay="2" aria-label="Atalhos úteis">
            <div className="notfound-number">404</div>
            <div className="notfound-card">
              <span className="notfound-card-label">Atalhos úteis</span>
              <ul className="notfound-links">
                {atalhos.map((atalho) => (
                  <li key={atalho.to}>
                    <Link to={atalho.to} className="notfound-link">
                      <span className="notfound-link-icon">
                        <i className={atalho.icon} />
                      </span>
                      <span>{atalho.label}</span>
                      <i className="fa-solid fa-arrow-right notfound-link-arrow" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
