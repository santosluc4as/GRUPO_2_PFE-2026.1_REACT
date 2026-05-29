/**
 * dadosSobre.js — Dados estáticos da página Sobre
 * Centraliza fundadores, citações e áreas de atuação.
 */

// Imagens dos conselheiros (importadas do src/images)
import alexandreReis from '../../images/conselheiros/alexandre-reis.jpg';
import americoOliveira from '../../images/conselheiros/americo-oliveira.png';
import antonioAlmeida from '../../images/conselheiros/antonio-almeida.png';
import carlosAlberto from '../../images/conselheiros/carlos-alberto.png';
import claudiaLeite from '../../images/conselheiros/claudia-leite.png';
import gilbertoBueno from '../../images/conselheiros/gilberto-bueno.png';
import henriqueBravo from '../../images/conselheiros/henrique-bravo.png';
import italoMartins from '../../images/conselheiros/italo-martins.png';
import manoelCarnauba from '../../images/conselheiros/manoel-carnauba.png';
import pauloSardinha from '../../images/conselheiros/paulo-sardinha.png';
import ricardoGentil from '../../images/conselheiros/ricardo-gentil.png';
import roqueMartins from '../../images/conselheiros/roque-martins.png';
import sergioAraujo from '../../images/conselheiros/sergio-araujo.png';
import telmoBauler from '../../images/conselheiros/telmo-bauler.png';

// Imagem do hero
import timeUnido from '../../images/time-unido.webp';

/* =====================================================================
   FUNDADORES — 14 sócios fundadores da ACB
   ===================================================================== */
export const fundadores = [
  { nome: "ALEXANDRE REIS", img: alexandreReis },
  { nome: "AMÉRICO OLIVEIRA", img: americoOliveira },
  { nome: "ANTONIO ALMEIDA", img: antonioAlmeida },
  { nome: "CARLOS ALBERTO", img: carlosAlberto },
  { nome: "CLAUDIA LEITE", img: claudiaLeite },
  { nome: "GILBERTO BUENO", img: gilbertoBueno },
  { nome: "HENRIQUE BRAVO", img: henriqueBravo },
  { nome: "ÍTALO MARTINS", img: italoMartins },
  { nome: "MANOEL CARBAÚBA", img: manoelCarnauba },
  { nome: "PAULO SARDINHA", img: pauloSardinha },
  { nome: "RICARDO PEIXOTO", img: ricardoGentil },
  { nome: "ROQUE MARTINS", img: roqueMartins },
  { nome: "SÉRGIO ARAUJO", img: sergioAraujo },
  { nome: "TELMO BAULER", img: telmoBauler },
];

/* =====================================================================
   CITAÇÕES DOS SÓCIOS — Carrossel "Palavra dos Sócios"
   ===================================================================== */
export const citacoesSocios = [
  {
    name: "ALEXANDRE REIS",
    quote:
      "A preservação da verdade institucional não é apenas um serviço, é um dever cívico que assumimos com o mais alto rigor técnico.",
    img: alexandreReis,
  },
  {
    name: "AMÉRICO OLIVEIRA",
    quote:
      "Nossa missão é transformar a governança corporativa em um pilar de sustentabilidade e crescimento para as empresas brasileiras.",
    img: americoOliveira,
  },
  {
    name: "ANTONIO ALMEIDA",
    quote:
      "A ética e a transparência são os alicerces sobre os quais construímos o futuro das organizações que servimos.",
    img: antonioAlmeida,
  },
];

/* =====================================================================
   ÁREAS DE ATUAÇÃO — 9 especialidades da ACB
   ===================================================================== */
export const areasAtuacao = [
  {
    icone: "ph ph-globe-hemisphere-west",
    titulo: "Internacionalização",
    descricao: "Expansão de horizontes institucionais com segurança jurídica global.",
    corClasse: "card-yellow",
    extraClasse: "card-internacionalizacao",
  },
  {
    icone: "ph ph-fingerprint",
    titulo: "Digitalização",
    descricao: "Transição segura para o digital com integridade garantida.",
    corClasse: "card-gray",
    extraClasse: "card-digitalizacao",
  },
  {
    icone: "ph ph-handshake",
    titulo: "Fusões e aquisições",
    descricao: "Curadoria estratégica em processos de M&A.",
    corClasse: "card-gray",
    extraClasse: "card-fusoes",
  },
  {
    icone: "ph ph-buildings",
    titulo: "Cultura organizacional",
    descricao: "Alinhamento de valores e tradições institucionais.",
    corClasse: "card-white",
    extraClasse: "card-cultura",
  },
  {
    icone: "ph ph-seal-check",
    titulo: "Liderança",
    descricao: "Desenvolvimento de quadros executivos com visão de legado.",
    corClasse: "",
    extraClasse: "card-lideranca",
    isLideranca: true,
  },
  {
    icone: "ph ph-medal",
    titulo: "Sucessão",
    descricao: "Preservação da continuidade institucional familiar e corporativa.",
    corClasse: "card-gray",
    extraClasse: "card-sucessao",
  },
  {
    icone: "ph ph-leaf",
    titulo: "Sustentabilidade",
    descricao: "Governança ambiental e responsabilidade de longo prazo.",
    corClasse: "card-gray",
    extraClasse: "card-sustentabilidade",
  },
  {
    icone: "ph ph-package",
    titulo: "Logística",
    descricao: "Eficiência operacional e rastreabilidade documental.",
    corClasse: "card-white",
    extraClasse: "card-logistica",
  },
  {
    icone: "ph ph-users",
    titulo: "Diversidade",
    descricao: "Inclusão estratégica e equidade como pilar de inovação institucional.",
    corClasse: "card-white",
    extraClasse: "card-diversidade",
  },
];

/* =====================================================================
   IMAGEM DO HERO
   ===================================================================== */
export { timeUnido };
