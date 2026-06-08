import { useEffect } from "react";

/**
 * Cria e atualiza a barra de progresso de scroll no topo da página
 */
export const useBarraProgresso = () => {
  useEffect(() => {
    const barra = document.createElement('div');
    barra.className = 'barra-progresso-scroll';
    barra.setAttribute('role', 'progressbar');
    barra.setAttribute('aria-label', 'Progresso de leitura da página');
    document.body.prepend(barra);

    const atualizar = () => {
      const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
      const progresso = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
      barra.style.width = `${Math.min(progresso, 100)}%`;
    };

    window.addEventListener('scroll', atualizar, { passive: true });
    atualizar();

    return () => {
      window.removeEventListener('scroll', atualizar);
      barra.remove();
    };
  }, []);
};
