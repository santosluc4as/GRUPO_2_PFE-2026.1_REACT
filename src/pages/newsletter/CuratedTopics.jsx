import { Link } from 'react-router-dom';
import {
  decodeHTML,
  getCategoryNames,
  getImageUrl,
  getExcerpt,
} from '../../hooks/useNewsletterApi';

/**
 * CuratedTopics — Seção de destaques curados (4 posts mais recentes)
 *
 * @param {Object} props
 * @param {Array}  props.posts    — Array de posts da API
 * @param {boolean} props.loading — Se está carregando
 */
const CuratedTopics = ({ posts, loading }) => {
  if (loading) {
    return (
      <section className="curated" id="curated-topics">
        <div className="curated__container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div className="archive__loading-spinner"></div>
            <p style={{ color: 'var(--cor-cinza-texto)', marginTop: '16px' }}>
              Carregando destaques...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!posts || posts.length === 0) return null;

  // 3 cards top
  const topCards = posts.slice(0, 3);
  // Feature principal (4º post, ou o 1º se só tiver 3)
  const featurePost = posts[3] || posts[0];
  const featureImg = getImageUrl(featurePost);
  const featureTitle = decodeHTML(featurePost.title.rendered);
  const featureDesc = getExcerpt(featurePost, 200);
  const featureCategories = getCategoryNames(featurePost);

  return (
    <section className="curated" id="curated-topics">
      <div className="curated__container">
        {/* Grid top — 3 cards */}
        <div className="curated__grid-top">
          {topCards.map((post, i) => {
            const title = decodeHTML(post.title.rendered);
            const categories = getCategoryNames(post);
            const tag = categories[0] || 'NOTÍCIA';
            const isHighlight = i === 2;

            if (isHighlight) {
              return (
                <div
                  className="curated__card curated__card--highlight"
                  key={post.id}
                >
                  <h3 className="curated__card-title curated__card-title--dark">
                    {title}
                  </h3>
                  <Link to={`/newsletter/${post.slug}`} className="curated__card-link curated__card-link--dark">
                    LER MATÉRIA →
                  </Link>
                </div>
              );
            }

            return (
              <div className="curated__card" key={post.id}>
                <span className="curated__tag">{tag.toUpperCase()}</span>
                <h3 className="curated__card-title">{title}</h3>
                <Link to={`/newsletter/${post.slug}`} className="curated__card-link">
                  LER MATÉRIA →
                </Link>
              </div>
            );
          })}
        </div>

        {/* Feature principal */}
        <div className="curated__feature">
          <div className="curated__feature-image">
            {featureImg ? (
              <img
                src={featureImg}
                alt={featureTitle}
                className="curated__feature-img"
                loading="lazy"
              />
            ) : (
              <div className="curated__feature-placeholder"></div>
            )}
          </div>
          <div className="curated__feature-content">
            <h3 className="curated__feature-title">{featureTitle}</h3>
            <p className="curated__feature-desc">{featureDesc}</p>
            <div className="curated__feature-tags">
              {featureCategories.map((c, idx) => (
                <span className="curated__feature-tag" key={idx}>
                  {c.toUpperCase()}
                </span>
              ))}
            </div>
            <Link
              to={`/newsletter/${featurePost.slug}`}
              className="curated__card-link"
              style={{ marginTop: '12px', display: 'inline-block', color: '#8d6a24' }}
            >
              LER MATÉRIA →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedTopics;
