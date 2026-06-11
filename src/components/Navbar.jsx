import { useState, useEffect, useRef } from "react";
import logo from "../images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { escaparHTML, escaparRegex } from "../utils/textUtils";

const API_BASE = "https://acbrasil.org.br/cms/wp-json/wp/v2";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre nós" },
  { href: "/insights", label: "Insights" },
  { href: "/newsletter", label: "Notícias" },
  { href: "/contato", label: "Contato" },
];

// ===== BUSCA GLOBAL =====
function BuscaOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResultados([]);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, isOpen]);

  const handleInput = (e) => {
    const termo = e.target.value;
    setQuery(termo);

    clearTimeout(debounceRef.current);

    if (termo.trim().length < 2) {
      setResultados([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setCarregando(true);
      try {
        const params = `search=${encodeURIComponent(termo)}&per_page=6&_fields=title,excerpt,link,type`;
        const [posts, paginas] = await Promise.all([
          fetch(`${API_BASE}/posts?${params}`).then((r) => r.json()),
          fetch(`${API_BASE}/pages?${params}`).then((r) => r.json()),
        ]);

        const itens = [...posts, ...paginas].map((item) => ({
          titulo: item.title.rendered,
          descricao: item.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 100) + '...' || '',
          url: item.link,
          icone: item.type === 'post' ? 'fa-newspaper' : 'fa-file',
          tag: item.type === 'post' ? 'Notícia' : 'Página',
        }));

        setResultados(itens);
      } catch {
        setResultados([]);
      } finally {
        setCarregando(false);
      }
    }, 300);
  };

  const destacarTermo = (texto, termo) => {
    if (!termo) return escaparHTML(texto);
    const regex = new RegExp(`(${escaparRegex(termo)})`, 'gi');
    return escaparHTML(texto).replace(
      regex,
      '<mark style="background:rgba(200,151,42,0.25);color:inherit;border-radius:2px;">$1</mark>'
    );
  };

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
            onChange={handleInput}
          />
        </div>

        <div className="busca-resultados" id="buscaResultados">
          {!query.trim() && (
            <p className="busca-dica">Digite para buscar páginas e conteúdos do site.</p>
          )}
          {carregando && <p className="busca-dica">Buscando...</p>}
          {!carregando && query.trim().length >= 2 && resultados.length === 0 && (
            <div className="busca-sem-resultado">
              <i className="fa-solid fa-circle-question" />
              <p>Nenhum resultado encontrado para "<strong>{query}</strong>"</p>
            </div>
          )}
          {resultados.map((item, i) => (
            <a
              key={i}
              href={item.url}
              className="busca-resultado-item"
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={onClose}
            >
              <div className="busca-resultado-icone">
                <i className={`fa-solid ${item.icone}`} />
              </div>
              <div className="busca-resultado-conteudo">
                <div
                  className="busca-resultado-titulo"
                  dangerouslySetInnerHTML={{ __html: destacarTermo(item.titulo, query) }}
                />
                <div
                  className="busca-resultado-descricao"
                  dangerouslySetInnerHTML={{ __html: destacarTermo(item.descricao, query) }}
                />
              </div>
              <span className="busca-resultado-tag">{item.tag}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== NAVBAR =====
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [buscaOpen, setBuscaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha menu mobile ao trocar de rota
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Fecha menu ao clicar fora
  useEffect(() => {
    const handleClick = (e) => {
      if (menuOpen && !e.target.closest('#cabecalho')) setMenuOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [menuOpen]);

  // Atalho Ctrl+K para abrir busca
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setBuscaOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const isAtivo = (href) => location.pathname === href;

  return (
    <>
      <BuscaOverlay isOpen={buscaOpen} onClose={() => setBuscaOpen(false)} />

      <header className={`cabecalho${scrolled ? " rolando" : ""}`} id="cabecalho">
        <nav className="navegacao" role="navigation" aria-label="Menu principal">

          <Link to="/" className="logo" aria-label="ACB - Página inicial" tabIndex={-1} aria-hidden="true">
            <img src={logo} alt="" className="logo-imagem" />
          </Link>

          <ul className="menu-lista" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="menu-item">
                <Link
                  to={link.href}
                  className={`menu-link${isAtivo(link.href) ? " menu-link--ativo" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-acoes">
            <button className="btn-busca" aria-label="Abrir busca" onClick={() => setBuscaOpen(true)}>
              <i className="fa-solid fa-magnifying-glass" />
            </button>
            <Link to="/associe-se" className="btn-area-associados">Área de Associados</Link>
            <button
              className="btn-menu-mobile"
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
        <div className={`menu-mobile${menuOpen ? " ativo" : ""}`} id="menuMobile" aria-hidden={!menuOpen}>
          <ul className="menu-mobile-lista" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`menu-mobile-link${isAtivo(link.href) ? " menu-link--ativo" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/associe-se" className="menu-mobile-link menu-mobile-link--destaque">
                Área de Associados
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
