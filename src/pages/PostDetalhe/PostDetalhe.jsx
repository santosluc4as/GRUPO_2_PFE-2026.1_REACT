import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './PostDetalhe.css';

const API_BASE = 'https://acbrasil.org.br/cms/wp-json/wp/v2';

const CONTEUDO_ESPECIAL_RE = /<iframe|<object|<embed|\[[\w-]+/i;

const PostDetalhe = ({ backTo, backLabel }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setErro(false);
    setPost(null);

    const fetchPost = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!data.length) throw new Error('Post não encontrado');
        setPost(data[0]);
      } catch {
        setErro(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="post-detalhe-main">
        <div className="post-detalhe">
          <div className="post-detalhe__skeleton post-detalhe__skeleton--hero" />
          <div className="post-detalhe__skeleton post-detalhe__skeleton--titulo" />
          <div className="post-detalhe__skeleton post-detalhe__skeleton--meta" />
          <div className="post-detalhe__skeleton post-detalhe__skeleton--texto" />
        </div>
      </main>
    );
  }

  if (erro || !post) {
    return (
      <main className="post-detalhe-main">
        <div className="post-detalhe" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <i
            className="fa-solid fa-circle-exclamation"
            style={{ fontSize: '2.5rem', color: 'var(--cor-cinza-texto)', opacity: 0.4, marginBottom: '16px', display: 'block' }}
          />
          <p style={{ color: 'var(--cor-cinza-texto)', marginBottom: '24px' }}>
            Publicação não encontrada.
          </p>
          <Link to={backTo} className="post-detalhe__voltar">
            ← Voltar para {backLabel}
          </Link>
        </div>
      </main>
    );
  }

  const titulo = post.title.rendered;
  const conteudo = post.content.rendered;
  const data = new Date(post.date).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
  const autor = post._embedded?.author?.[0]?.name;
  const imagem = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const categorias = post._embedded?.['wp:term']?.[0]?.map(t => t.name) || [];
  const temConteudoEspecial = CONTEUDO_ESPECIAL_RE.test(conteudo);

  return (
    <main className="post-detalhe-main">
      <article className="post-detalhe post-detalhe--animar">

        <nav className="post-detalhe__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Início</Link>
          <span aria-hidden="true">›</span>
          <Link to={backTo}>{backLabel}</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page" dangerouslySetInnerHTML={{ __html: titulo }} />
        </nav>

        {imagem && (
          <img
            src={imagem}
            alt={titulo.replace(/<[^>]*>/g, '')}
            className="post-detalhe__hero"
            loading="eager"
          />
        )}

        <div className="post-detalhe__cabecalho">
          {categorias.length > 0 && (
            <div className="post-detalhe__tags">
              {categorias.map((c, i) => (
                <span className="post-detalhe__tag" key={i}>{c}</span>
              ))}
            </div>
          )}

          <h1
            className="post-detalhe__titulo"
            dangerouslySetInnerHTML={{ __html: titulo }}
          />

          <div className="post-detalhe__meta">
            {autor && (
              <span>
                <i className="fa-solid fa-user" aria-hidden="true" /> {autor}
              </span>
            )}
            <span>
              <i className="fa-solid fa-calendar" aria-hidden="true" /> {data}
            </span>
          </div>
        </div>

        {temConteudoEspecial && (
          <div className="post-detalhe__aviso">
            <i className="fa-solid fa-circle-info" aria-hidden="true" />
            <span>
              Este conteúdo pode incluir elementos interativos (vídeos, formulários ou
              arquivos) que podem não ser exibidos completamente nesta visualização.
            </span>
          </div>
        )}

        <div
          className="post-detalhe__conteudo"
          dangerouslySetInnerHTML={{ __html: conteudo }}
        />

        <div className="post-detalhe__voltar-wrapper">
          <button className="post-detalhe__voltar" onClick={() => navigate(-1)}>
            ← Voltar
          </button>
        </div>
      </article>
    </main>
  );
};

export default PostDetalhe;
