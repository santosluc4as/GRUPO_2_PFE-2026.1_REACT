import { useState, useEffect } from "react";

/**
 * Botão flutuante que aparece após 400px de scroll
 * e leva o usuário de volta ao topo da página
 */
const BotaoTopo = () => {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisivel(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const voltarAoTopo = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className="back-to-top"
      aria-label="Voltar ao topo"
      onClick={voltarAoTopo}
      style={{ opacity: visivel ? 1 : 0, visibility: visivel ? 'visible' : 'hidden' }}
    >
      <i className="fa-solid fa-arrow-up" />
    </button>
  );
};

export default BotaoTopo;
