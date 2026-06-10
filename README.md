# ACBrasil — Site Institucional (React)

Repositório do site institucional da **Associação de Conselheiros do Brasil (ACBrasil)**, desenvolvido em **React** com **Vite**. Versão componentizada e single-page (SPA) do portal, evoluída a partir do projeto original em HTML, CSS e JavaScript puro.

## Stack / Tecnologias

- **React 19** — biblioteca de interface
- **React Router DOM 7** — roteamento entre páginas (SPA)
- **Vite 8** — servidor de desenvolvimento e build
- **CSS3** — estilização com Design Tokens (CSS Variables)
- **JavaScript (ES Modules)**
- **APIs REST externas** — WordPress REST API da ACBrasil
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
    ├── index.css # Estilos base globais + Design Tokens
    │
    ├── components/ # Componentes compartilhados entre páginas
    │   ├── Navbar.jsx # Cabeçalho, menu mobile e busca global
    │   ├── Footer.jsx # Rodapé
    │   └── BotaoTopo.jsx # Botão "voltar ao topo"
    │
    ├── pages/
    │   ├── home/ # Página inicial
    │   ├── sobre/ # Sobre nós
    │   ├── newsletter/ # Notícias
    │   ├── Associe-se/ # Formulário de adesão
    │   ├── Contato/ # Contato
    │   ├── FAQ/ # Perguntas frequentes
    │   └── NotFound/ # Página 404
    │
    ├── hooks/ # Hooks customizados (lógica reutilizável)
    ├── utils/ # Funções auxiliares (máscaras, validação, texto)
    └── images/ # Imagens locais (logos, hero, conselheiros)
```

## Como Atualizar o Conteúdo

### Páginas

Cada página fica em sua própria pasta dentro de `src/pages/`, contendo o componente `.jsx` e o `.css` correspondente. Para adicionar uma nova página, crie a pasta, o componente, e registre a rota em `src/App.jsx`.

### Componentes compartilhados

Elementos presentes em todas as páginas (cabeçalho, rodapé, botão de topo) ficam em `src/components/`. Mantenha-os consistentes ao alterar a navegação.

### CSS

- Para alterações **globais** (cores, tipografia, espaçamentos base), edite os Design Tokens em `src/index.css`.
- Para alterações **específicas** de uma página, edite o arquivo `.css` dentro da pasta da página em `src/pages/`.

### Scripts (JavaScript)

- Para **lógica compartilhada** entre páginas, use ou crie um hook em `src/hooks/`.
- Para **funções utilitárias** (máscaras, validações, formatação de texto), edite os arquivos em `src/utils/`.

### Imagens

Adicione ou substitua imagens em `src/images/`. Fotos de conselheiros devem ser salvas em `src/images/conselheiros/`.

## Como Executar

Pré-requisitos: **Node.js 18+** e npm.

```bash
npm install      # Instala as dependências
npm run dev      # Ambiente de desenvolvimento (http://localhost:5173)
npm run build    # Gera o build de produção
npm run preview  # Pré-visualiza o build
npm run lint     # Verifica os padrões de código
```

## Licença

Propriedade intelectual da Associação de Conselheiros do Brasil (ACBrasil). Todos os direitos reservados.
