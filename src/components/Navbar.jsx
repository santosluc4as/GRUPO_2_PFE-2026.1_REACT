import { useState, useEffect, useRef } from "react";
import logo from "../images/logo.png";

const NAV_LINKS = [
  { href: "../index.html", label: "Início" },
  { href: "sobre.html", label: "Sobre nós" },
  { href: "insights.html", label: "Insights" },
  { href: "newsletter.html", label: "Notícias" },
  { href: "contato.html", label: "Contato" },
];

// ===== BARRA DE BUSCA GLOBAL =====
function BuscaOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className={`busca-overlay${isOpen ? " ativo" : ""}`}
      id="buscaOverlay"
      role="dialog"
      aria-label="Busca no site"
      aria-hidden={!isOpen}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="busca-container">
        <div className="busca-cabecalho">
          <span className="busca-titulo">O que você procura?</span>
          <button className="busca-fechar" onClick={onClose} aria-label="Fechar busca">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="busca-campo-wrapper">
          <i className="fa-solid fa-magnifying-glass busca-icone" />
          <label htmlFor="buscaInput" className="sr-only">Barra de busca do site</label>
          <input
            ref={inputRef}
            type="text"
            id="buscaInput"
            className="busca-campo"
            placeholder="Buscar páginas, conteúdos, associados..."
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="busca-resultados" id="buscaResultados">
          <p className="busca-dica">Digite para buscar páginas e conteúdos do site.</p>
        </div>
      </div>
    </div>
  );
}

// ===== NAVBAR =====
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [buscaOpen, setBuscaOpen] = useState(false);

  return (
    <>
      <BuscaOverlay isOpen={buscaOpen} onClose={() => setBuscaOpen(false)} />

      <header className="cabecalho" id="cabecalho">
        <nav className="navegacao" role="navigation" aria-label="Menu principal">

          {/* Logo */}
          <a href="../index.html" className="logo" aria-label="ACB - Página inicial">
            <img src={logo} alt="ACB - Associação de Conselheiros do Brasil" className="logo-imagem" />
          </a>

          {/* Links de navegação (desktop) */}
          <ul className="menu-lista" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="menu-item">
                <a href={link.href} className="menu-link">{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Ações da navbar */}
          <div className="navbar-acoes">
            <button
              className="btn-busca"
              id="btnBusca"
              aria-label="Abrir busca"
              onClick={() => setBuscaOpen(true)}
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>

            <a href="associe-se.html" className="btn-area-associados">
              Área de Associados
            </a>

            <button
              className="btn-menu-mobile"
              id="btnMenuMobile"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="hamburguer-linha" />
              <span className="hamburguer-linha" />
              <span className="hamburguer-linha" />
            </button>
          </div>

        </nav>

        {/* Menu Mobile */}
        <div
          className="menu-mobile"
          id="menuMobile"
          aria-hidden={!menuOpen}
        >
          <ul className="menu-mobile-lista" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="menu-mobile-link">{link.label}</a>
              </li>
            ))}
            <li>
              <a href="associe-se.html" className="menu-mobile-link menu-mobile-link--destaque">
                Área de Associados
              </a>
            </li>
          </ul>
        </div>

      </header>
    </>
  );
}
