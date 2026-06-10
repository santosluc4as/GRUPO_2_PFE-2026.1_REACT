export const WP_API_BASE = 'https://acbrasil.org.br/cms/wp-json/wp/v2';

export const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e2e8f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='16'%3ESem imagem%3C/text%3E%3C/svg%3E";

export function formatNumber(num) {
  return new Intl.NumberFormat('pt-BR').format(num);
}

export function formatCurrency(num) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
}

export function formatPercent(num) {
  return (
    new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num) + '%'
  );
}

export function formatDatePtBR(dateString) {
  const date = new Date(dateString);
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  return `${date.getDate().toString().padStart(2, '0')} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

export function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export function decodeHtml(html) {
  const tmp = document.createElement('textarea');
  tmp.innerHTML = html;
  return tmp.value;
}

export function getFeaturedImage(post, size) {
  try {
    const media = post._embedded['wp:featuredmedia'];
    if (media?.[0]) {
      const sizes = media[0].media_details?.sizes;
      return sizes?.[size]?.source_url ?? media[0].source_url;
    }
  } catch { /* usa imagem de fallback */ }
  return FALLBACK_IMG;
}

export function getCategory(post) {
  try {
    const terms = post._embedded['wp:term'];
    if (terms?.[0]?.[0]) return terms[0][0].name;
  } catch { /* usa categoria padrão */ }
  return 'Artigo';
}
