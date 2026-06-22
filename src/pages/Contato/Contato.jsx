import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAnimacaoEntrada } from "../../hooks/useAnimacaoEntrada";
import "./contato.css";

const estadoInicialFormulario = {
  nome: "",
  email: "",
  assunto: "",
  mensagem: "",
};

const estadoInicialErros = {
  nome: "",
  email: "",
  assunto: "",
  mensagem: "",
};

function Contato() {
  const [formData, setFormData] = useState(estadoInicialFormulario);
  const [erros, setErros] = useState(estadoInicialErros);

  useAnimacaoEntrada();

  useEffect(() => {
    document.title = "Contato | ACB Brasil - Associação de Conselheiros do Brasil";
  }, []);

  function emailValido(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(valor);
  }

  function validarCampo(nomeCampo, valor) {
    const valorLimpo = valor.trim();

    switch (nomeCampo) {
      case "nome":
        if (valorLimpo.length < 3) {
          return "Informe um nome completo válido.";
        }
        return "";

      case "email":
        if (!emailValido(valorLimpo)) {
          return "Informe um e-mail válido.";
        }
        return "";

      case "assunto":
        if (valorLimpo === "") {
          return "Selecione um assunto.";
        }
        return "";

      case "mensagem":
        if (valorLimpo.length < 10) {
          return "Escreva uma mensagem com pelo menos 10 caracteres.";
        }
        return "";

      default:
        return "";
    }
  }

  function validarFormulario() {
    const novosErros = {
      nome: validarCampo("nome", formData.nome),
      email: validarCampo("email", formData.email),
      assunto: validarCampo("assunto", formData.assunto),
      mensagem: validarCampo("mensagem", formData.mensagem),
    };

    setErros(novosErros);

    return Object.values(novosErros).every((erro) => erro === "");
  }

  function handleChange(evento) {
    const { name, value } = evento.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErros((prev) => ({
      ...prev,
      [name]: validarCampo(name, value),
    }));
  }

  function handleSubmit(evento) {
  const formularioValido = validarFormulario();

  if (!formularioValido) {
    evento.preventDefault();
  }
}

  return (
    <>
    <a href="#conteudo-principal" className="skip-link skip-link--contato">
        Pular para o conteúdo principal
      </a>

      <main id="conteudo-principal" className="pagina-contato">
        <section
          className="hero-contato animacao-entrada"
          data-delay="1"
          aria-labelledby="titulo-contato"
        >
          <div className="hero-contato__box">
            <div
              className="hero-contato_decoracao_amarela"
              aria-hidden="true"
            ></div>
            <div
              className="hero-contato__decoracao_base"
              aria-hidden="true"
            ></div>

            <div className="hero-contato__container">
              <p className="hero-contato__kicker">ATENDIMENTO INSTITUCIONAL</p>

              <h1 id="titulo-contato" className="hero-contato__titulo">
                Entre em Contato
              </h1>

              <p className="hero-contato__descricao">
                Preencha o formulário e nos envie uma solicitação!
                <br />
                Ou nos visite no endereço abaixo!
              </p>
            </div>
          </div>
        </section>

        <section
          className="contato-conteudo"
          aria-label="Informações de contato e formulário"
        >
          <div className="contato-conteudo__container">
            <div
              className="contato-conteudo__info animacao-entrada"
              data-delay="2"
            >
              <section
                className="info-contato"
                aria-labelledby="titulo-endereco"
              >
                <h2 id="titulo-endereco" className="info-contato__titulo">
                  ENDEREÇO SEDE
                </h2>

                <address className="info-contato__texto">
                  <span className="info-contato__icone" aria-hidden="true">
                    <i className="fa-solid fa-map-pin"></i>
                  </span>
                  <p>
                    Av. das Américas, 1000
                    <br />
                    Centro, Rio de Janeiro — RJ
                    <br />
                    CEP 22640-100
                  </p>
                </address>
              </section>

              <section className="info-contato" aria-labelledby="titulo-canais">
                <h2 id="titulo-canais" className="info-contato__titulo">
                  CANAIS DIRETOS
                </h2>

                <div className="info-contato__texto">
                  <p>
                    <a href="tel:+552110000000">
                      <span className="info-contato__icone" aria-hidden="true">
                        <i className="fa-solid fa-phone"></i>
                      </span>
                      +55 (21) 1000-0000
                    </a>
                  </p>

                  <p>
                    <a href="mailto:contato@acbrasil.org">
                      <span className="info-contato__icone" aria-hidden="true">
                        <i className="fa-regular fa-envelope"></i>
                      </span>
                      contato@acbrasil.org
                    </a>
                  </p>
                </div>
              </section>

              <section className="mapa-contato" aria-labelledby="titulo-mapa">
                <h2 id="titulo-mapa" className="sr-only">
                  Mapa da localização
                </h2>

                <div className="mapa-contato__janela">
                  <p className="mapa-contato__frase">Nos visite!</p>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Av.+das+Am%C3%A9ricas,+1000,+Rio+de+Janeiro,+RJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mapa-contato__botao"
                  >
                    Abrir no Google Maps
                  </a>
                </div>
              </section>
            </div>

            <section
              className="formulario-contato-box animacao-entrada"
              data-delay="1"
              aria-labelledby="titulo-formulario"
            >
              <h2 id="titulo-formulario" className="sr-only">
                Formulário de contato
              </h2>

              <form
                id="formulario-contato"
                className="formulario-contato"
                noValidate
                action="https://formsubmit.co/devwebtms@gmail.com"
                method="POST"
                onSubmit={handleSubmit}>

                <div className="formulario-contato__campo">
                  <label htmlFor="nome">NOME COMPLETO</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Insira seu nome"
                    autoComplete="name"
                    value={formData.nome}
                    onChange={handleChange}
                    aria-describedby="erro-nome"
                    aria-invalid={Boolean(erros.nome)}
                  />
                  <span
                    id="erro-nome"
                    className="mensagem-erro"
                    aria-live="polite"
                  >
                    {erros.nome}
                  </span>
                </div>

                <div className="formulario-contato__campo">
                  <label htmlFor="email">E-MAIL</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="exemplo@email.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-describedby="erro-email"
                    aria-invalid={Boolean(erros.email)}
                  />
                  <span
                    id="erro-email"
                    className="mensagem-erro"
                    aria-live="polite"
                  >
                    {erros.email}
                  </span>
                </div>

                <div className="formulario-contato__campo">
                  <label htmlFor="assunto">ASSUNTO</label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    aria-describedby="erro-assunto"
                    aria-invalid={Boolean(erros.assunto)}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="afiliacao">Afiliação Institucional</option>
                    <option value="duvida">Dúvida Geral</option>
                    <option value="eventos">Eventos</option>
                    <option value="imprensa">Imprensa</option>
                    <option value="outro">Outro</option>
                  </select>
                  <span
                    id="erro-assunto"
                    className="mensagem-erro"
                    aria-live="polite"
                  >
                    {erros.assunto}
                  </span>
                </div>

                <div className="formulario-contato__campo">
                  <label htmlFor="mensagem">MENSAGEM</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows="6"
                    placeholder="Descreva sua solicitação com detalhes..."
                    value={formData.mensagem}
                    onChange={handleChange}
                    aria-describedby="erro-mensagem"
                    aria-invalid={Boolean(erros.mensagem)}
                  ></textarea>
                  <span
                    id="erro-mensagem"
                    className="mensagem-erro"
                    aria-live="polite"
                  >
                    {erros.mensagem}
                  </span>
                </div>

                <button type="submit" className="formulario-contato__enviar">
                  Enviar Protocolo
                  <span aria-hidden="true">▷</span>
                </button>

                <p className="formulario-contato__texto-legal">
                  AO ENVIAR, VOCÊ CONCORDA COM NOSSOS TERMOS DE GOVERNANÇA E
                  PRIVACIDADE.
                </p>

              </form>
            </section>
          </div>
        </section>

        <section
          className="apoio-imediato animacao-entrada"
          data-delay="1"
          aria-labelledby="titulo-apoio"
        >
          <div className="apoio-imediato__container">
            <header className="apoio-imediato__header">
              <h2 id="titulo-apoio" className="apoio-imediato__titulo">
                Canais de Apoio Imediato
              </h2>
              <span className="apoio-imediato__linha" aria-hidden="true"></span>
            </header>

            <div className="apoio-imediato__cards">
              <article className="card-apoio">
                <div className="card-apoio__icone" aria-hidden="true">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <h3 className="card-apoio__titulo">WhatsApp</h3>
                <p className="card-apoio__texto">
                  Atendimento ágil para associados e dúvidas rápidas sobre
                  eventos.
                </p>
                <a href="#" className="card-apoio__link">
                  Iniciar Conversa →
                </a>
              </article>

              <article className="card-apoio">
                <div className="card-apoio__icone" aria-hidden="true">
                  <i className="fa-brands fa-linkedin"></i>
                </div>
                <h3 className="card-apoio__titulo">Redes Sociais</h3>
                <p className="card-apoio__texto">
                  Acompanhe nossas publicações e artigos técnicos no LinkedIn.
                </p>
                <a
                  href="https://www.linkedin.com/company/associacao-de-conselheiros-do-brasil/"
                  className="card-apoio__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Perfil →
                </a>
              </article>

              <article className="card-apoio">
                <div className="card-apoio__icone" aria-hidden="true">
                  <i className="fa-regular fa-circle-question"></i>
                </div>
                <h3 className="card-apoio__titulo">Central de Ajuda</h3>
                <p className="card-apoio__texto">
                  Respostas imediatas para as perguntas mais frequentes da
                  comunidade.
                </p>
                <Link to="/faq" className="card-apoio__link">
                  Acessar FAQ →
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Contato;