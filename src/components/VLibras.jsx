import { useEffect } from "react";

// Garante que o widget seja inicializado apenas uma vez,
// mesmo com o duplo-mount do StrictMode em desenvolvimento.
let vlibrasIniciado = false;

/**
 * Carrega o widget VLibras dinamicamente
 */
const VLibras = () => {
  useEffect(() => {
    if (vlibrasIniciado) return;
    vlibrasIniciado = true;

    const iniciarWidget = () => {
      if (!window.VLibras) return;
      new window.VLibras.Widget("https://vlibras.gov.br/app");
      // O plugin coloca a inicialização dentro de window.onload. Numa SPA
      // o script é injetado depois que a página já carregou, então esse
      // evento nunca dispara de novo. Chamamos o handler manualmente para
      // o widget renderizar o botão e os controles.
      if (typeof window.onload === "function") {
        window.onload();
      }
    };

    // Se o script já estiver carregado, apenas inicializa
    if (window.VLibras) {
      iniciarWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = iniciarWidget;
    document.body.appendChild(script);
    // Não removemos o script na limpeza: o widget precisa dele durante
    // toda a navegação e a remoção quebrava o botão.
  }, []);

  return (
    <div vw="true" className="enabled">
      <div vw-access-button="true" className="active" />
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
};

export default VLibras;
