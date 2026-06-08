import './Newsletter.css';
import { useAnimacaoEntrada } from '../../hooks/useAnimacaoEntrada';
import { useNewsletterApi } from '../../hooks/useNewsletterApi';
import HeroNewsletter from './HeroNewsletter';
import NewsletterSubscribe from './NewsletterSubscribe';
import CuratedTopics from './CuratedTopics';
import NewsletterArchive from './NewsletterArchive';

/**
 * Newsletter — Página "Notícias" da ACBrasil
 *
 * Seções:
 *  1. Hero (título + subtítulo institucional)
 *  2. Newsletter Subscribe (formulário de inscrição)
 *  3. Tópicos Curados (4 destaques via API WordPress)
 *  4. Arquivo de Notícias (grid paginado com busca)
 */
const Newsletter = () => {
  const {
    curatedPosts,
    loadingCurated,
    archivePosts,
    loadingArchive,
    currentPage,
    totalPages,
    totalPosts,
    goToPage,
    updateSearch,
  } = useNewsletterApi();

  // Ativa animações de entrada via Intersection Observer
  // Re-observa quando os posts carregam (conteúdo dinâmico)
  useAnimacaoEntrada([loadingCurated, loadingArchive]);

  return (
    <>
      {/* ===== HERO ===== */}
      <HeroNewsletter />

      {/* ===== INSCRIÇÃO ===== */}
      <NewsletterSubscribe />

      {/* ===== TÓPICOS CURADOS ===== */}
      <CuratedTopics posts={curatedPosts} loading={loadingCurated} />

      {/* ===== ARQUIVO DE NOTÍCIAS ===== */}
      <NewsletterArchive
        posts={archivePosts}
        loading={loadingArchive}
        currentPage={currentPage}
        totalPages={totalPages}
        totalPosts={totalPosts}
        goToPage={goToPage}
        updateSearch={updateSearch}
      />
    </>
  );
};

export default Newsletter;
