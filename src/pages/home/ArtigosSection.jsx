import { useState, useEffect } from 'react';
import { useAnimacaoEntrada } from '../../hooks/useAnimacaoEntrada';
import {
  WP_API_BASE, getFeaturedImage, getCategory,
  stripHtml, decodeHtml, formatDatePtBR,
} from './dadosHome';

export default function ArtigosSection() {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(false);

  useAnimacaoEntrada([articles]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          `${WP_API_BASE}/posts?_embed&per_page=3&categories=20&_fields=id,link,title,excerpt,date,_links,_embedded`
        );
        const posts = await res.json();
        setArticles(posts?.length ? posts : []);
      } catch (_) {
        setError(true);
      }
    }
    fetchArticles();
  }, []);

  return (
    <section className="articles-section animacao-entrada" data-delay="1">
      <div className="container">
        <div className="section-header">
          <div className="section-title-group">
            <h2>Notícias mais recentes</h2>
            <div className="section-title-bar" />
          </div>
          <a href="/insights" className="view-all">
            Ver todos <i className="fas fa-chevron-right" />
          </a>
        </div>
        <p className="section-subtitle">
          Acompanhe as últimas tendências e análises em governança.
        </p>
        <div className="articles-grid">
          {error ? (
            <p style={{ gridColumn: '1/-1', color: 'var(--cor-erro)' }}>
              Erro ao carregar artigos. Tente novamente mais tarde.
            </p>
          ) : !articles ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="article-card loading-skeleton" />
            ))
          ) : articles.length === 0 ? (
            <p style={{ gridColumn: '1/-1', color: 'var(--text-muted)' }}>Nenhum artigo encontrado.</p>
          ) : (
            articles.map((post) => (
              <article key={post.id} className="article-card">
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="article-image">
                  <img src={getFeaturedImage(post, 'medium_large')} alt={decodeHtml(post.title.rendered)} loading="lazy" />
                </a>
                <div className="article-content">
                  <span className="category">{getCategory(post)}</span>
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <h3>{decodeHtml(post.title.rendered)}</h3>
                  </a>
                  <p>{stripHtml(post.excerpt.rendered).substring(0, 150)}...</p>
                  <span className="date">{formatDatePtBR(post.date)}</span>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
