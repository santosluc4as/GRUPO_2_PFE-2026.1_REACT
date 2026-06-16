import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * useNewsletterApi — Hook para consumo da API WordPress REST da ACBrasil
 *
 * Endpoint base: https://acbrasil.org.br/cms/wp-json/wp/v2/
 * Gerencia estado de posts, paginação, busca e cache.
 */

const API_BASE = 'https://acbrasil.org.br/cms/wp-json/wp/v2';
const PER_PAGE = 6;

// ─── UTILS ───────────────────────────────────────────────
export function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export function stripTags(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  const months = [
    'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
    'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function getImageUrl(post) {
  if (post.uagb_featured_image_src?.medium?.[0]) {
    return post.uagb_featured_image_src.medium[0];
  }
  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
}

export function getCategoryNames(post) {
  if (post._embedded?.['wp:term']?.[0]) {
    return post._embedded['wp:term'][0].map(t => t.name);
  }
  return [];
}

export function getExcerpt(post, maxLen = 160) {
  const raw = stripTags(decodeHTML(post.excerpt?.rendered || ''));
  return raw.length > maxLen ? raw.substring(0, maxLen).trim() + '…' : raw;
}

// ─── HOOK ────────────────────────────────────────────────
export function useNewsletterApi() {
  const [archivePosts, setArchivePosts] = useState([]);
  const [curatedPosts, setCuratedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingArchive, setLoadingArchive] = useState(true);
  const [loadingCurated, setLoadingCurated] = useState(true);

  const cache = useRef(new Map());

  // Fetch genérico com cache
  const fetchPosts = useCallback(async (page = 1, perPage = PER_PAGE, search = '') => {
    const cacheKey = `${page}-${perPage}-${search}`;
    if (cache.current.has(cacheKey)) return cache.current.get(cacheKey);

    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      _embed: 'true',
      orderby: 'date',
      order: 'desc',
    });

    if (search) params.set('search', search);

    try {
      const res = await fetch(`${API_BASE}/posts?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const posts = await res.json();
      const tp = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
      const tt = parseInt(res.headers.get('X-WP-Total') || '0', 10);

      const result = { posts, totalPages: tp, totalPosts: tt };
      cache.current.set(cacheKey, result);
      return result;
    } catch (err) {
      console.error('Erro ao carregar posts:', err);
      return { posts: [], totalPages: 1, totalPosts: 0 };
    }
  }, []);

  // Carrega destaques (4 posts mais recentes)
  const loadCurated = useCallback(async () => {
    setLoadingCurated(true);
    const { posts } = await fetchPosts(1, 4);
    setCuratedPosts(posts);
    setLoadingCurated(false);
  }, [fetchPosts]);

  // Carrega arquivo paginado
  const loadArchive = useCallback(async (page = 1) => {
    setLoadingArchive(true);
    setCurrentPage(page);

    const { posts, totalPages: tp, totalPosts: tt } = await fetchPosts(page, PER_PAGE, searchQuery);

    setArchivePosts(posts);
    setTotalPages(tp);
    setTotalPosts(tt);
    setLoadingArchive(false);
  }, [fetchPosts, searchQuery]);

  // Navegar para página
  const goToPage = useCallback((page) => {
    loadArchive(page);
  }, [loadArchive]);

  // Atualizar busca (limpa cache)
  const updateSearch = useCallback((query) => {
    setSearchQuery(query);
    cache.current.clear();
  }, []);

  // Efeito inicial: carregar destaques
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCurated();
  }, [loadCurated]);

  // Efeito: carregar arquivo quando searchQuery muda
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadArchive(1);
  }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    // Destaques
    curatedPosts,
    loadingCurated,
    // Arquivo
    archivePosts,
    loadingArchive,
    currentPage,
    totalPages,
    totalPosts,
    // Ações
    goToPage,
    updateSearch,
    searchQuery,
  };
}
