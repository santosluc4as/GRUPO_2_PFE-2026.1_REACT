import { useState } from 'react';
import newsletterCaneta from '../../images/newsletter-caneta.png';

/**
 * NewsletterSubscribe — Card de inscrição na newsletter
 */
const NewsletterSubscribe = () => {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Simulação de envio (futuramente integrar com backend)
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
    setEmail('');
  };

  return (
    <section className="newsletter-subscribe" id="newsletter-subscribe">
      <div className="newsletter-subscribe__container">
        <div
          className="newsletter-subscribe__card animacao-entrada"
          data-delay="1"
          style={{
            '--bg-image': `url(${newsletterCaneta})`,
          }}
        >
          {/* Pseudo-element background via inline style variable */}
          <style>{`
            .newsletter-subscribe__card::before {
              background-image: var(--bg-image);
            }
          `}</style>

          <div className="newsletter-subscribe__content">
            <h2 className="newsletter-subscribe__title">
              Receba notícias da ACB em sua <br /> caixa de entrada.
            </h2>
            <p className="newsletter-subscribe__subtitle">
              Fique por dentro das tendências, artigos e eventos exclusivos para
              associados e conselheiros.
            </p>

            <form
              className="newsletter-subscribe__form"
              id="subscribeForm"
              onSubmit={handleSubmit}
            >
              <div className="newsletter-subscribe__field">
                <label
                  htmlFor="emailInput"
                  className="newsletter-subscribe__label"
                >
                  ENDEREÇO DE E-MAIL
                </label>
                <input
                  type="email"
                  className="newsletter-subscribe__input"
                  id="emailInput"
                  placeholder="nome@exemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="newsletter-subscribe__btn"
                id="subscribeBtn"
              >
                {enviado ? (
                  'INSCRITO COM SUCESSO ✓'
                ) : (
                  <>
                    INSCREVER-SE NA LISTA DE TRANSMISSÃO{' '}
                    <i className="fas fa-arrow-right"></i>
                  </>
                )}
              </button>
            </form>
            <p className="newsletter-subscribe__disclaimer">
              Ao se inscrever, você concorda com nossa Política de Privacidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;
