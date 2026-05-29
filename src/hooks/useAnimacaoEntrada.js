import { useEffect } from 'react';

/**
 * useAnimacaoEntrada — Hook para animações de entrada via Intersection Observer
 * 
 * Observa todos os elementos com a classe "animacao-entrada" e
 * adiciona "visivel" quando entram na viewport (anima apenas uma vez).
 * 
 * Equivalente React da função inicializarAnimacoesEntrada() de global.js.
 * 
 * @param {Array} deps — Dependências extras para re-observar elementos
 *                        (útil quando o conteúdo é renderizado dinamicamente)
 */
export function useAnimacaoEntrada(deps = []) {
  useEffect(() => {
    const elementos = document.querySelectorAll('.animacao-entrada');
    if (!elementos.length) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observador.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    elementos.forEach((el) => observador.observe(el));

    return () => observador.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
