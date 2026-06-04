import logo from "../images/logo.png";

const REDES_SOCIAIS = [
  { href: "#", label: "Compartilhar", icon: "fa-solid fa-share-nodes" },
  { href: "https://www.linkedin.com/company/associacao-de-conselheiros-do-brasil/", label: "LinkedIn", icon: "fa-brands fa-linkedin-in", externo: true },
  { href: "https://www.youtube.com/@acbrasil", label: "YouTube", icon: "fa-brands fa-youtube", externo: true },
  { href: "https://www.instagram.com/acbrasil.oficial/", label: "Instagram", icon: "fa-brands fa-instagram", externo: true },
  { href: "#", label: "WhatsApp", icon: "fa-brands fa-whatsapp" },
];

const NAV_LINKS = [
  { href: "newsletter.html", label: "Notícias" },
  { href: "contato.html", label: "Contato" },
  { href: "insights.html", label: "Insights" },
  { href: "sobre.html", label: "Sobre nós" },
  { href: "faq.html", label: "FAQ" },
];

const ASSOCIADOS_LINKS = [
  { href: "#", label: "Torne-se Membro" },
  { href: "#", label: "Portal Privado" },
  { href: "#", label: "Benefícios" },
];

const CONTATO_ITEMS = [
  { icon: "fa-solid fa-envelope", href: "mailto:contato@acbrasil.org", label: "contato@acbrasil.org", tipo: "link" },
  { icon: "fa-solid fa-phone", href: "tel:+5521100000000", label: "+55 (21) 1000-0000", tipo: "link" },
  { icon: "fa-solid fa-location-dot", label: "Av. das Américas, 1000 - RJ", tipo: "texto" },
];

const Footer = () => {
  return (
    <footer className="rodape">

      <div className="rodape-principal">

        {/* Coluna de identidade */}
        <div className="rodape-identidade">
          <a href="../index.html" className="logo logo--rodape" aria-label="ACB - Página inicial">
            <img
              src={logo}
              alt="ACB - Associação de Conselheiros do Brasil"
              className="logo-imagem logo-imagem--rodape"
            />
          </a>
          <p className="rodape-descricao">
            Transformando a governança em crescimento, confiança e futuro para as empresas brasileiras desde 2022.
          </p>
          <div className="rodape-redes-sociais">
            {REDES_SOCIAIS.map((rede) => (
              <a
                key={rede.label}
                href={rede.href}
                className="rede-social-link"
                aria-label={rede.label}
                {...(rede.externo && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <i className={rede.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Coluna de navegação */}
        <div className="rodape-coluna">
          <h2 className="rodape-titulo-coluna">Navegação</h2>
          <ul className="rodape-lista">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="rodape-link">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna de associados */}
        <div className="rodape-coluna">
          <h2 className="rodape-titulo-coluna">Associados</h2>
          <ul className="rodape-lista">
            {ASSOCIADOS_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="rodape-link">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna de suporte */}
        <div className="rodape-coluna">
          <h2 className="rodape-titulo-coluna">Suporte Institucional</h2>
          <ul className="rodape-lista rodape-lista--contato">
            {CONTATO_ITEMS.map((item) => (
              <li key={item.label}>
                <i className={item.icon} />
                {item.tipo === "link" ? (
                  <a href={item.href} className="rodape-link">{item.label}</a>
                ) : (
                  <span className="rodape-texto">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Rodapé inferior */}
      <div className="rodape-inferior">
        <p className="rodape-direitos">© 2026 Associação de Conselheiros do Brasil. Todos os direitos reservados.</p>
        <div className="rodape-politicas">
          <a href="#" className="rodape-politica-link">Política de Cookies</a>
          <a href="#" className="rodape-politica-link">Política de Privacidade</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
