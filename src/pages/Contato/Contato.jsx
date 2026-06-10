import "./contato.css"

function Contato () {
    <div>
{/* =====================================================
     CONFIGURAÇÕES BÁSICAS DA PÁGINA
     - Metadados
     - Título da aba
     - Ícone do site
    ===================================================== */}

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Página de contato institucional da ACB Brasil." />

  <title>Contato | ACB Brasil - Associação de Conselheiros do Brasil</title>






   {/* Link de acessibilidade: permite que usuários de teclado ou leitores de tela pulem diretamente para o conteúdo principal  */}
  <a href="#conteudo-principal" className="skip-link">Pular para o conteúdo principal</a>

     {/* ===== BARRA DE BUSCA GLOBAL =====  */}
  <div className="busca-overlay" id="buscaOverlay" role="dialog" aria-label="Busca no site" aria-hidden="true">
    <div className="busca-container">
      <div className="busca-cabecalho">
        <span className="busca-titulo">O que você procura?</span>
        <button className="busca-fechar" id="buscaFechar" aria-label="Fechar busca">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="busca-campo-wrapper">
        <i className="fa-solid fa-magnifying-glass busca-icone"></i>
        <label htmlFor="buscaInput" className="sr-only">Barra de busca do site</label>
        <input type="text" id="buscaInput" className="busca-campo" placeholder="Buscar páginas, conteúdos, associados..."
          autocomplete="off" />
      </div>
      <div className="busca-resultados" id="buscaResultados">
        <p className="busca-dica">Digite para buscar páginas e conteúdos do site.</p>
      </div>
    </div>
  </div>

   

   {/* Hero  */}
  <main id="conteudo-principal">
    <section className="hero-contato animacao-entrada" data-delay="1" aria-labelledby="titulo-contato">
      <div className="hero-contato__box">
          <div className="hero-contato_decoracao_amarela" aria-hidden="true"></div>
          <div className="hero-contato__decoracao_base" aria-hidden="true"></div>
        <div className="hero-contato__container">
          <p className="hero-contato__kicker">ATENDIMENTO INSTITUCIONAL</p>
           {/* Título h1 dentro do Hero */}
          <h1 id="titulo-contato" className="hero-contato__titulo">Entre em Contato</h1>
          <p className="hero-contato__descricao">
            Preencha o formulário e nos envie uma solicitação! 
            <br />Ou nos visite no endereço abaixo!
          </p>
        </div>
      </div>
    </section>

     {/* Conteúdo principal, dividido em 2 colunas na visualização de desktop  */}
    <section className="contato-conteudo" aria-label="Informações de contato e formulário">
      <div className="contato-conteudo__container">

         {/* Esquerda: Informações de contato  */}
        <div className="contato-conteudo__info animacao-entrada" data-delay="2">
          
           {/* Seção de Endereço da Sede  */}
          <section className="info-contato" aria-labelledby="titulo-endereco">
            <h2 id="titulo-endereco" className="info-contato__titulo">ENDEREÇO SEDE</h2>
            <address className="info-contato__texto">
              <span className="info-contato__icone" aria-hidden="true"><i className="fa-solid fa-map-pin"></i></span>
              <p>
                Av. das Américas, 1000
                <br />Centro, Rio de Janeiro — RJ
                <br />CEP 22640-100
              </p>
            </address>
          </section>

           {/* Seção de Canais para contato direto */}
          <section className="info-contato" aria-labelledby="titulo-canais">
            <h2 id="titulo-canais" className="info-contato__titulo">CANAIS DIRETOS</h2>
            <div className="info-contato__texto">
              <p><a href="tel:+552110000000"><span className="info-contato__icone" aria-hidden="true"><i className="fa-solid fa-phone"></i></span> +55 (21) 1000-0000</a></p>
              <p><a href="mailto:contato@acbrasil.org"><span className="info-contato__icone" aria-hidden="true"><i className="fa-regular fa-envelope"></i></span> contato@acbrasil.org</a></p>
            </div>
          </section>

           {/* Seção com um hiperlink para o Google Maps  */}
          <section className="mapa-contato" aria-labelledby="titulo-mapa">
            <h2 id="titulo-mapa" className="sr-only">Mapa da localização</h2>

            <div className="mapa-contato__janela">
              <p className="mapa-contato__frase">Nos visite!</p>
              <a href="https://www.google.com/maps/search/?api=1&query=Av.+das+Am%C3%A9ricas,+1000,+Rio+de+Janeiro,+RJ"
                target="_blank" rel="noopener noreferrer" className="mapa-contato__botao">
                Abrir no Google Maps
              </a>
            </div>
          </section>
        </div>

         {/* Section do Formulário  */}
        <section className="formulario-contato-box animacao-entrada" data-delay="1" aria-labelledby="titulo-formulario">
          <h2 id="titulo-formulario" className="sr-only">Formulário de contato</h2>

           {/* Formulário, é validado pelo contato.js  */}
          <form id="formulario-contato" className="formulario-contato" novalidate>
            <div className="formulario-contato__campo">
              <label htmlFor="nome">NOME COMPLETO</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Insira seu nome"
                autocomplete="name"
                required
                aria-describedby="erro-nome"
              />
              <span id="erro-nome" className="mensagem-erro" aria-live="polite"></span>
            </div>

            <div className="formulario-contato__campo">
              <label htmlFor="email">E-MAIL</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="exemplo@email.com"
                autocomplete="email"
                required
                aria-describedby="erro-email"
              />
              <span id="erro-email" className="mensagem-erro" aria-live="polite"></span>
            </div>

            <div className="formulario-contato__campo">
              <label htmlFor="assunto">ASSUNTO</label>
              <select
                id="assunto"
                name="assunto"
                required
                aria-describedby="erro-assunto"
              >
                <option value="" selected>Selecione um assunto</option>
                <option value="afiliacao">Afiliação Institucional</option>
                <option value="duvida">Dúvida Geral</option>
                <option value="eventos">Eventos</option>
                <option value="imprensa">Imprensa</option>
                <option value="outro">Outro</option>
              </select>
              <span id="erro-assunto" className="mensagem-erro" aria-live="polite"></span>
            </div>

            <div className="formulario-contato__campo">
              <label htmlFor="mensagem">MENSAGEM</label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows="6"
                placeholder="Descreva sua solicitação com detalhes..."
                required
                aria-describedby="erro-mensagem"
              ></textarea>
              <span id="erro-mensagem" className="mensagem-erro" aria-live="polite"></span>
            </div>

            <button type="submit" className="formulario-contato__enviar">
              Enviar Protocolo
              <span aria-hidden="true">▷</span>
            </button>

            <p className="formulario-contato__texto-legal">
              AO ENVIAR, VOCÊ CONCORDA COM NOSSOS TERMOS DE GOVERNANÇA E PRIVACIDADE.
            </p>

            <p id="mensagem-sucesso" className="mensagem-sucesso" aria-live="polite"></p>
          </form>
        </section>
      </div>
    </section>

     {/* Seção de Apoio Imediato  */}
    <section className="apoio-imediato animacao-entrada" data-delay="1" aria-labelledby="titulo-apoio">
      <div className="apoio-imediato__container">
        <header className="apoio-imediato__header">
          <h2 id="titulo-apoio" className="apoio-imediato__titulo">Canais de Apoio Imediato</h2>
          <span className="apoio-imediato__linha" aria-hidden="true"></span>
        </header>

        <div className="apoio-imediato__cards">
          <article className="card-apoio">
            <div className="card-apoio__icone" aria-hidden="true"><i className="fa-brands fa-whatsapp"></i></div>
            <h3 className="card-apoio__titulo">WhatsApp</h3>  
            <p className="card-apoio__texto">
              Atendimento ágil para associados e dúvidas rápidas sobre eventos.
            </p>
            <a href="#" className="card-apoio__link">Iniciar Conversa →</a>
          </article>

          <article className="card-apoio">
            <div className="card-apoio__icone" aria-hidden="true"><i className="fa-brands fa-linkedin"></i></div>
            <h3 className="card-apoio__titulo">Redes Sociais</h3>
            <p className="card-apoio__texto">
              Acompanhe nossas publicações e artigos técnicos no LinkedIn.
            </p>
            <a href="https://www.linkedin.com/company/associacao-de-conselheiros-do-brasil/" className="card-apoio__link">Ver Perfil →</a>
          </article>

          <article className="card-apoio">
            <div className="card-apoio__icone" aria-hidden="true"><i className="fa-regular fa-circle-question"></i></div>
            <h3 className="card-apoio__titulo">Central de Ajuda</h3>
            <p className="card-apoio__texto">
              Respostas imediatas para as perguntas mais frequentes da comunidade.
            </p>
            <a href="./faq.html" className="card-apoio__link">Acessar FAQ →</a>
          </article>
        </div>
      </div>
    </section>
  </main>

   {/* ===== RODAPÉ GLOBAL =====  */}
  <footer className="rodape">

    <div className="rodape-principal">

       {/* Coluna de identidade  */}
      <div className="rodape-identidade">
        <a href="../index.html" className="logo logo--rodape" aria-label="ACB - Página inicial">
          <img src="../images/logo-acb-fundo-transparente.png" alt="ACB - Associação de Conselheiros do Brasil"
            className="logo-imagem logo-imagem--rodape" />
        </a>
        <p className="rodape-descricao">
          Transformando a governança em crescimento, confiança e futuro para as empresas brasileiras desde 2022.
        </p>
        <div className="rodape-redes-sociais">
          <a href="#" className="rede-social-link" aria-label="Compartilhar">
            <i className="fa-solid fa-share-nodes"></i>
          </a>
          <a href="https://www.linkedin.com/company/associacao-de-conselheiros-do-brasil/" className="rede-social-link"
            aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="https://www.youtube.com/@acbrasil" className="rede-social-link" aria-label="YouTube" target="_blank"
            rel="noopener noreferrer">
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a href="https://www.instagram.com/acbrasil.oficial/" className="rede-social-link" aria-label="Instagram"
            target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="rede-social-link" aria-label="WhatsApp">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
        </div>
      </div>

       {/* Coluna de navegação  */}
      <div className="rodape-coluna">
        <h2 className="rodape-titulo-coluna">Navegação</h2>
        <ul className="rodape-lista">
          <li><a href="newsletter.html" className="rodape-link">Notícias</a></li>
          <li><a href="contato.html" className="rodape-link">Contato</a></li>
          <li><a href="insights.html" className="rodape-link">Insights</a></li>
          <li><a href="sobre.html" className="rodape-link">Sobre nós</a></li>
          <li><a href="faq.html" className="rodape-link">FAQ</a></li>
        </ul>
      </div>

       {/* Coluna de associados  */}
      <div className="rodape-coluna">
        <h2 className="rodape-titulo-coluna">Associados</h2>
        <ul className="rodape-lista">
          <li><a href="associe-se.html" className="rodape-link">Torne-se Membro</a></li>
          <li><a href="#" className="rodape-link">Portal Privativo</a></li>
          <li><a href="#" className="rodape-link">Benefícios</a></li>
        </ul>
      </div>

       {/* Coluna de suporte  */}
      <div className="rodape-coluna">
        <h2 className="rodape-titulo-coluna">Suporte Institucional</h2>
        <ul className="rodape-lista rodape-lista--contato">
          <li>
            <i className="fa-solid fa-envelope"></i>
            <a href="mailto:contato@acbrasil.org" className="rodape-link">contato@acbrasil.org</a>
          </li>
          <li>
            <i className="fa-solid fa-phone"></i>
            <a href="tel:+5521100000000" className="rodape-link">+55 (21) 1000-0000</a>
          </li>
          <li>
            <i className="fa-solid fa-location-dot"></i>
            <span className="rodape-texto">Av. das Américas, 1000 - RJ</span>
          </li>
        </ul>
      </div>

    </div>

     {/* Rodapé inferior  */}
    <div className="rodape-inferior">
      <p className="rodape-direitos">© 2026 Associação de Conselheiros do Brasil. Todos os direitos reservados.</p>
      <div className="rodape-politicas">
        <a href="#" className="rodape-politica-link">Política de Cookies</a>
        <a href="#" className="rodape-politica-link">Política de Privacidade</a>
      </div>
    </div>

  </footer>
  </div>
}

export default Contato;