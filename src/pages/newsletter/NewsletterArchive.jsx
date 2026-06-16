import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { decodeHTML, formatDate, getImageUrl } from '../../hooks/useNewsletterApi';

/**
 * NewsletterArchive — Arquivo de notícias com grid paginado e busca
 *
 * @param {Object}   props
 * @param {Array}    props.posts       — Posts da página atual
 * @param {boolean}  props.loading     — Se está carregando
 * @param {number}   props.currentPage — Página atual
 * @param {number}   props.totalPages  — Total de páginas
 * @param {number}   props.totalPosts  — Total de posts
 * @param {Function} props.goToPage    — Função para navegar entre páginas
 * @param {Function} props.updateSearch — Função para atualizar a busca
 */
const NewsletterArchive = ({
  posts,
  loading,
  currentPage,
  totalPages,
  totalPosts,
  goToPage,
  updateSearch,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const debounceTimer = useRef(null);
  const archiveRef = useRef(null);

  // Debounce na busca
  const handleSearch = useCallback(
    (value) => {
      setSearchInput(value);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        updateSearch(value.trim());
      }, 400);
    },
    [updateSearch]
  );

  // Cleanup do timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  // Scroll suave ao trocar de página (exceto primeira carga)
  const handlePageChange = (page) => {
    goToPage(page);
    if (archiveRef.current && page > 1) {
      archiveRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Gera array de páginas com ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section className="archive" id="archive" ref={archiveRef}>
      <div className="archive__container">
        {/* Cabeçalho */}
        <div className="archive__header">
          <div className="archive__header-text">
            <h2 className="archive__title">Arquivo de Notícias</h2>
            <p className="archive__subtitle">
              Confira todo o histórico de publicações para os associados.
            </p>
          </div>
          <div className="archive__controls">
            {/* Paginação */}
            {totalPages > 1 && (
              <div className="archive__pagination" id="pagination">
                {getPageNumbers().map((p, idx) => {
                  if (p === '...') {
                    return (
                      <span className="archive__page-ellipsis" key={`ellipsis-${idx}`}>
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      className={`archive__page-btn${
                        p === currentPage ? ' archive__page-btn--active' : ''
                      }`}
                      key={p}
                      onClick={() => handlePageChange(p)}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  className="archive__page-btn archive__page-btn--arrow"
                  disabled={currentPage >= totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  →
                </button>
              </div>
            )}
            {/* Busca */}
            <div className="archive__search">
              <label htmlFor="searchInput" className="sr-only">
                Barra de busca do site
              </label>
              <input
                type="text"
                className="archive__search-input"
                id="searchInput"
                placeholder="Buscar no arquivo..."
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <svg
                className="archive__search-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        {/* Grid de cards */}
        <div className="archive__grid" id="archiveGrid">
          {loading ? (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '60px 20px',
              }}
            >
              <div className="archive__loading-spinner"></div>
              <p
                style={{
                  color: 'var(--cor-cinza-texto)',
                  marginTop: '16px',
                }}
              >
                Carregando publicações...
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '60px 20px',
              }}
            >
              <i
                className="fa-solid fa-newspaper"
                style={{
                  fontSize: '2.5rem',
                  color: 'var(--cor-cinza-texto)',
                  opacity: 0.4,
                  marginBottom: '16px',
                  display: 'block',
                }}
              ></i>
              <p
                style={{
                  color: 'var(--cor-cinza-texto)',
                  fontSize: 'var(--texto-base)',
                }}
              >
                Nenhuma publicação encontrada.
              </p>
            </div>
          ) : (
            posts.map((post, i) => {
              const title = decodeHTML(post.title.rendered);
              const date = formatDate(post.date);
              const img = getImageUrl(post);
              const edition =
                totalPosts - ((currentPage - 1) * 6 + i);

              return (
                <article
                  className="archive__card"
                  key={post.id}
                  data-edition={edition}
                  style={{
                    animation: `fadeInUp 0.4s ease ${i * 80}ms both`,
                  }}
                >
                  <Link
                    to={`/newsletter/${post.slug}`}
                    className="archive__card-link-wrapper"
                  >
                    <div className="archive__card-info">
                      <span className="archive__edition">
                        ED. #{edition > 0 ? edition : i + 1}
                      </span>
                      <h3 className="archive__card-title">{title}</h3>
                      <span className="archive__date">{date}</span>
                    </div>
                    <div className="archive__card-image">
                      {img ? (
                        <img
                          src={img}
                          alt={title}
                          className="archive__card-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="archive__card-placeholder"></div>
                      )}
                    </div>
                  </Link>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterArchive;
