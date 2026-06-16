import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Insights.css';
import { useAnimacaoEntrada } from '../../hooks/useAnimacaoEntrada';

const Insights = () => {
  const API_BASE = 'https://acbrasil.org.br/cms/wp-json/wp/v2';
  
  const [todosArtigos, setTodosArtigos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [termoBusca, setTermoBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [email, setEmail] = useState('');

  // Paginação state
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 6;

  useAnimacaoEntrada();

  useEffect(() => {
    const buscarPosts = async () => {
      try {
        const response = await fetch(`${API_BASE}/posts?_embed&per_page=100&categories=20`);
        if (!response.ok) throw new Error('Falha ao buscar posts');
        
        const posts = await response.json();
        const artigos = posts.map(post => ({
          id: post.id,
          slug: post.slug,
          titulo: post.title.rendered,
          resumo: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
          data: new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
          imagem: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800',
          categoria: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Geral'
        }));

        setTodosArtigos(artigos);
        setLoading(false);
      } catch (error) {
        console.error('Erro:', error);
        setErro(true);
        setLoading(false);
      }
    };

    buscarPosts();
  }, []);

  const artigosFiltrados = useMemo(() => {
    let filtrados = todosArtigos;
    if (categoriaAtiva !== 'Todos') {
      filtrados = filtrados.filter(a => a.categoria === categoriaAtiva);
    }
    if (termoBusca) {
      const termo = termoBusca.toLowerCase();
      filtrados = filtrados.filter(a =>
        a.titulo.toLowerCase().includes(termo) ||
        a.resumo.toLowerCase().includes(termo)
      );
    }
    return filtrados;
  }, [categoriaAtiva, termoBusca, todosArtigos]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (window.exibirToast) {
      window.exibirToast(`Sucesso! ${email} cadastrado.`, 'sucesso');
    } else {
      alert(`Sucesso! ${email} cadastrado.`);
    }
    setEmail('');
  };

  const noFilters = categoriaAtiva === 'Todos' && !termoBusca;
  const destaque = noFilters && artigosFiltrados.length > 0 ? artigosFiltrados[0] : null;
  const artigosParaGrid = noFilters ? artigosFiltrados.slice(1) : artigosFiltrados;

  // Lógica de paginação
  const totalPaginas = Math.ceil(artigosParaGrid.length / itensPorPagina);
  const indexUltimoArtigo = paginaAtual * itensPorPagina;
  const indexPrimeiroArtigo = indexUltimoArtigo - itensPorPagina;
  const artigosDaPagina = artigosParaGrid.slice(indexPrimeiroArtigo, indexUltimoArtigo);

  return (
    <main>
      <section className="hero-insights">
        <div className="container container--hero">
          <div className="hero-conteudo">
            <span className="hero-tag animacao-entrada">Repositório Institucional</span>
            <h1 className="hero-titulo animacao-entrada" data-delay="1">Artigos e Conhecimentos</h1>
            <div className="hero-decoracao animacao-entrada" data-delay="2"></div>
          </div>
          <div className="hero-texto-intro animacao-entrada" data-delay="3">
            <p>Explore as tendências mais recentes, pesquisas aprofundadas e análises exclusivas preparadas pelos especialistas e conselheiros da ACB Brasil para impulsionar a governança corporativa.</p>
          </div>
        </div>

        <div className="container container--featured animacao-entrada" data-delay="4">
          {loading ? (
            <div className="featured-grid">
              <div className="featured-imagem-wrapper">
                <div className="skeleton" style={{ height: '400px', background: '#eee' }}></div>
              </div>
              <div className="featured-card">
                <div className="skeleton" style={{ height: '20px', width: '100px', marginBottom: '10px' }}></div>
                <div className="skeleton" style={{ height: '40px', marginBottom: '20px' }}></div>
                <div className="skeleton" style={{ height: '100px', marginBottom: '20px' }}></div>
              </div>
            </div>
          ) : destaque ? (
            <div className="featured-grid">
              <div className="featured-imagem-wrapper">
                <img src={destaque.imagem} alt={destaque.titulo} className="featured-imagem" />
              </div>
              <div className="featured-card">
                <div className="featured-header">
                  <span className="tag-destaque">Destaque</span>
                  <span className="featured-data">{destaque.data}</span>
                </div>
                <h2 className="featured-titulo" dangerouslySetInnerHTML={{ __html: destaque.titulo }}></h2>
                <p className="featured-snippet" dangerouslySetInnerHTML={{ __html: destaque.resumo }}></p>
                <Link to={`/artigo/${destaque.slug}`} className="featured-link">Ler Artigo Completo <i className="fa-solid fa-arrow-right"></i></Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="secao-filtros animacao-entrada" data-delay="1">
        <div className="container container--filtros">
          <div className="filtros-wrapper">
            <div className="filtros-botoes">
              {['Todos', 'Compliance', 'Diversidade', 'Energia', 'Governança'].map(cat => (
                <button 
                  key={cat}
                  className={`btn-filtro ${categoriaAtiva === cat ? 'btn-filtro--ativo' : ''}`}
                  onClick={() => { setCategoriaAtiva(cat); setPaginaAtual(1); }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {totalPaginas > 1 && (
              <div className="paginacao-topo">
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
                  <button
                    key={num}
                    className={`pag-item ${paginaAtual === num ? 'pag-item--ativo' : ''}`}
                    onClick={() => setPaginaAtual(num)}
                    style={{ border: 'none', background: paginaAtual === num ? 'var(--cor-dourado)' : 'var(--cor-cinza-claro)', cursor: 'pointer' }}
                  >
                    {num}
                  </button>
                ))}
                <button 
                  className="pag-item pag-proximo" 
                  aria-label="Próxima página"
                  onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}
                  disabled={paginaAtual === totalPaginas}
                  style={{ border: 'none', cursor: paginaAtual === totalPaginas ? 'not-allowed' : 'pointer' }}
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            )}

            <div className="busca-arquivo">
              <div className="busca-arquivo-campo">
                <i className="fa-solid fa-magnifying-glass"></i>
                <label htmlFor="buscaArquivo" className="sr-only">Barra de busca do site</label>
                <input 
                  type="text" 
                  id="buscaArquivo" 
                  placeholder="Buscar no arquivo..."
                  value={termoBusca}
                  onChange={(e) => { setTermoBusca(e.target.value); setPaginaAtual(1); }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="secao-grid animacao-entrada" data-delay="1">
        <div className="container container--grid">
          <div className="grid-insights">
            {loading ? (
              <>
                <div className="skeleton-card" style={{ height: '300px', background: '#f5f5f5' }}></div>
                <div className="skeleton-card" style={{ height: '300px', background: '#f5f5f5' }}></div>
                <div className="skeleton-card" style={{ height: '300px', background: '#f5f5f5' }}></div>
              </>
            ) : erro ? (
              <p className="erro-api" style={{gridColumn: "1 / -1", textAlign: "center"}}>Não foi possível carregar os artigos no momento.</p>
            ) : artigosDaPagina.length === 0 ? (
              <p className="sem-resultados" style={{gridColumn: "1 / -1", textAlign: "center"}}>Nenhum artigo encontrado.</p>
            ) : (
              artigosDaPagina.map(artigo => (
                <Link
                  key={artigo.id}
                  to={`/artigo/${artigo.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <article className="card-insight animacao-entrada visivel" style={{ height: '100%' }}>
                    <div className="card-imagem-wrapper">
                      <img src={artigo.imagem} alt={artigo.titulo} className="card-imagem" />
                    </div>
                    <div className="card-conteudo">
                      <span className="card-tag">{artigo.categoria.toUpperCase()}</span>
                      <h3 className="card-titulo" dangerouslySetInnerHTML={{ __html: artigo.titulo }}></h3>
                      <p className="card-snippet" dangerouslySetInnerHTML={{ __html: artigo.resumo }}></p>
                      <span className="card-data">{artigo.data}</span>
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="secao-newsletter animacao-entrada">
        <div className="newsletter-bg">
          <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" alt="Escritório desfocado" className="newsletter-img" />
          <div className="newsletter-overlay"></div>
        </div>
        <div className="container container--newsletter">
          <h2 className="newsletter-titulo">Acompanhe nossos Artigos</h2>
          <p className="newsletter-subtitulo">Receba diretamente em seu e-mail as principais atualizações sobre governança, compliance e tendências de mercado da ACB Brasil.</p>

          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              required 
              className="newsletter-input" 
              aria-label="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="newsletter-btn">INSCREVER-SE</button>
          </form>
          <p className="newsletter-aviso">RESPEITAMOS SUA PRIVACIDADE. CANCELE A QUALQUER MOMENTO.</p>
        </div>
      </section>
    </main>
  );
};

export default Insights;