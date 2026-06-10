/**
 * HeroNewsletter — Seção hero da página de Notícias
 */
const HeroNewsletter = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero__container">
        <div className="hero__grid">
          <div className="hero__left animacao-entrada" data-delay="1">
            <span className="hero__tag">INFORMATIVO INSTITUCIONAL</span>
            <h1 className="hero__title">
              Notícias <br />
              <span className="hero__title--highlight">ACBrasil</span>
            </h1>
            <div className="hero__title-bar"></div>
          </div>
          <div className="hero__right animacao-entrada" data-delay="2">
            <p className="hero__subtitle">
              Acompanhe análises exclusivas, relatórios institucionais e o
              panorama atual da governança corporativa no Brasil, com curadoria
              direta de nossos conselheiros.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNewsletter;
