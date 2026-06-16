# ACBrasil — Site Institucional (React)

Repositório do site institucional da **Associação de Conselheiros do Brasil (ACBrasil)**, desenvolvido em **React** com **Vite**. Versão componentizada e single-page (SPA) do portal, evoluída a partir do projeto original em HTML, CSS e JavaScript puro.

## Stack / Tecnologias

- **React 19** — biblioteca de interface
- **React Router DOM 7** — roteamento entre páginas (SPA)
- **Vite 8** — servidor de desenvolvimento e build
- **CSS3** — estilização com Design Tokens (CSS Variables)
- **JavaScript (ES Modules)**
- **WordPress REST API** — conteúdo dinâmico (artigos, newsletters) consumido de `acbrasil.org.br/cms`
- **ESLint** — padronização de código

## Estrutura do Projeto

```
.
├── index.html
├── vite.config.js
├── package.json
├── public/ # Assets estáticos (favicon, etc.)
└── src/
    ├── main.jsx # Ponto de entrada do React
    ├── App.jsx # Rotas e layout base (Navbar + Footer + BotãoTopo)
    ├── index.css # Estilos base globais
    ├── styles/
    │   └── global.css # Design Tokens (CSS Variables)
    │
    ├── components/ # Componentes compartilhados entre páginas
    │   ├── Navbar.jsx # Cabeçalho, menu mobile e busca global
    │   ├── Footer.jsx # Rodapé
    │   ├── BotaoTopo.jsx # Botão "voltar ao topo"
    │   └── WhatsappChat/ # Widget de chat via WhatsApp
    │       ├── WhatsAppChat.jsx
    │       └── WhatsAppChat.css
    │
    ├── pages/
    │   ├── home/ # Página inicial (/)
    │   │   ├── Home.jsx
    │   │   ├── ArtigosSection.jsx # Seção de artigos recentes
    │   │   ├── IndicadoresSection.jsx
    │   │   ├── dadosHome.js
    │   │   └── Home.css
    │   ├── sobre/ # Sobre nós (/sobre)
    │   │   ├── Sobre.jsx
    │   │   ├── ConselheiroPage.jsx # Perfil individual (/sobre/:slug)
    │   │   ├── AtuacaoGrid.jsx
    │   │   ├── CarrosselCitacoes.jsx
    │   │   ├── FundadoresGrid.jsx
    │   │   ├── dadosConselheiros.js
    │   │   ├── dadosSobre.js
    │   │   └── Sobre.css
    │   ├── newsletter/ # Newsletter (/newsletter)
    │   │   ├── Newsletter.jsx
    │   │   ├── HeroNewsletter.jsx
    │   │   ├── NewsletterArchive.jsx
    │   │   ├── NewsletterSubscribe.jsx
    │   │   ├── CuratedTopics.jsx
    │   │   └── Newsletter.css
    │   ├── Insights/ # Artigos / Insights (/insights)
    │   │   ├── Insights.jsx
    │   │   └── Insights.css
    │   ├── PostDetalhe/ # Leitura de post (/artigo/:slug, /newsletter/:slug)
    │   │   ├── PostDetalhe.jsx # Componente reutilizado por Insights e Newsletter
    │   │   └── PostDetalhe.css
    │   ├── Associe-se/ # Formulário de adesão (/associe-se)
    │   │   ├── AssocieSe.jsx
    │   │   └── associeSe.css
    │   ├── Contato/ # Contato (/contato)
    │   │   ├── Contato.jsx
    │   │   └── contato.css
    │   ├── FAQ/ # Perguntas frequentes (/faq)
    │   │   ├── FaqPage.jsx
    │   │   ├── FaqItem.jsx
    │   │   ├── faqData.jsx
    │   │   └── FaqPageStyle.css
    │   └── NotFound/ # Página 404
    │       ├── NotFoundPage.jsx
    │       └── NotFoundStyle.css
    │
    ├── hooks/ # Hooks customizados (lógica reutilizável)
    │   ├── useAnimacaoEntrada.js # Animações de entrada via IntersectionObserver
    │   ├── useBarraProgresso.js # Barra de progresso de leitura
    │   ├── useFormAdesao.js # Estado e submissão do formulário de adesão
    │   └── useNewsletterApi.js # Busca de posts/newsletters na API do WordPress
    │
    ├── utils/ # Funções auxiliares puras
    │   ├── mascaras.js # Máscaras de input (CPF, telefone, CEP…)
    │   ├── textUtils.js # Formatação e truncagem de texto
    │   └── validadores.js # Validação de campos de formulário
    │
    └── images/ # Imagens locais
        ├── conselheiros/ # Fotos dos conselheiros
        ├── logo.png
        ├── hero.png
        └── …
```

## Rotas

| Rota | Página |
|---|---|
| `/` | Home |
| `/sobre` | Sobre nós |
| `/sobre/:slug` | Perfil de conselheiro |
| `/insights` | Artigos / Insights |
| `/artigo/:slug` | Detalhe de artigo |
| `/newsletter` | Acervo de newsletters |
| `/newsletter/:slug` | Detalhe de newsletter |
| `/faq` | Perguntas frequentes |
| `/contato` | Contato |
| `/associe-se` | Formulário de adesão |
| `*` | Página 404 |

## Como Atualizar o Conteúdo

### Páginas

Cada página fica em sua própria pasta dentro de `src/pages/`, com o componente `.jsx` e o `.css` correspondente. Para adicionar uma nova página, crie a pasta, o componente, e registre a rota em `src/App.jsx`.

### Componentes compartilhados

Elementos presentes em todas as páginas (cabeçalho, rodapé, botão de topo, chat do WhatsApp) ficam em `src/components/`. Mantenha-os consistentes ao alterar a navegação.

### CSS

- Para alterações **globais** (cores, tipografia, espaçamentos base), edite os Design Tokens em `src/styles/global.css`.
- Para alterações **específicas** de uma página, edite o `.css` dentro da pasta da página em `src/pages/`.

### Conteúdo dinâmico (artigos e newsletters)

Os artigos (`/insights`) e newsletters (`/newsletter`) são consumidos em tempo real da WordPress REST API em `https://acbrasil.org.br/cms/wp-json/wp/v2`. A lógica de busca e paginação fica em `src/hooks/useNewsletterApi.js`. Para trocar a fonte de dados, basta alterar a constante `API_BASE` nesse hook.

### Scripts (JavaScript)

- Para **lógica compartilhada** entre páginas, use ou crie um hook em `src/hooks/`.
- Para **funções utilitárias** (máscaras, validações, formatação de texto), edite os arquivos em `src/utils/`.

### Imagens

Adicione ou substitua imagens em `src/images/`. Fotos de conselheiros devem ser salvas em `src/images/conselheiros/`.

## Como Executar

Pré-requisitos: **Node.js 18+** e npm.

```bash
npm install # Instala as dependências
npm run dev # Ambiente de desenvolvimento (http://localhost:5173)
npm run build # Gera o build de produção
npm run preview # Pré-visualiza o build
npm run lint # Verifica os padrões de código
```

## Licença

Propriedade intelectual da Associação de Conselheiros do Brasil (ACBrasil). Todos os direitos reservados.
