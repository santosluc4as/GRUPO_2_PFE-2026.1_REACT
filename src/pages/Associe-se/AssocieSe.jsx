import "../associe-se.css";
import { useFormAdesao } from "../../hooks/useFormAdesao";
 
const UFS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
];
 
const CATEGORIAS = [
  {
    tipo: "mantenedor",
    icone: "fa-solid fa-building-columns",
    nome: "Associado Mantenedor",
    descricao: "Pessoa jurídica que faça espontaneamente contribuições financeiras, doações ou cessão de recursos humanos e/ou materiais, considerados relevantes para o desenvolvimento e a execução das atividades da ACBrasil.",
  },
  {
    tipo: "efetivo",
    icone: "fa-solid fa-user-tie",
    nome: "Associado Efetivo",
    descricao: "Pessoa física ou jurídica que se proponha a colaborar na realização dos fins da Associação obrigando-se ao pagamento da mensalidade, nos montantes fixados pela Assembleia Geral.",
  },
  {
    tipo: "benemerito",
    icone: "fa-solid fa-award",
    nome: "Associado Benemérito",
    descricao: "Todo aquele merecedor de especial reconhecimento, em razão de contribuições relevantes para o desenvolvimento da ACBrasil.",
  },
];
 
const AssocieSe = () => {
  const {
    form, erros, enviando, tremendo, toast,
    handleChange, handleBlur, handleSubmit, classeCampo,
  } = useFormAdesao();
 
  return (
    <main className="conteudo-principal">
 
      {/* Toast */}
      {toast && (
        <div className={`toast toast--${toast.tipo}`}>
          <i className={`fa-solid ${toast.tipo === "sucesso" ? "fa-circle-check" : "fa-triangle-exclamation"}`} />
          {toast.mensagem}
        </div>
      )}
 
      <section className="secao-hero" id="associe-se">
        <div className="hero-decoracao-circulo" />
        <div className="hero-decoracao-linha" />
 
        <div className="hero-caixa-conteudo">
          <div className="hero-grade">
 
            {/* ===== COLUNA ESQUERDA ===== */}
            <div className="hero-coluna-esquerda">
              <span className="rotulo-secao animacao-entrada" data-delay="0">Conselho de Excelência</span>
 
              <h1 className="hero-titulo animacao-entrada" data-delay="1">
                Torne-se parte<br />
                <em className="hero-titulo-destaque">da nossa história</em>
              </h1>
 
              <p className="hero-descricao animacao-entrada" data-delay="2">
                A ACB reúne conselheiros comprometidos com a boa governança, a ética corporativa
                e o desenvolvimento sustentável das organizações brasileiras. Ao se associar, você
                passa a integrar uma rede de profissionais que atuam na transformação das estruturas
                de decisão do país — compartilhando conhecimento, fortalecendo práticas e ampliando
                seu impacto como conselheiro.
              </p>
 
              <div className="card-etica animacao-entrada" data-delay="3">
                <div className="card-etica-barra" />
                <div className="card-etica-conteudo">
                  <h2 className="card-etica-titulo">Código de Ética e Conduta</h2>
                  <p className="card-etica-texto">
                    O compromisso com a transparência e o rigor moral é o alicerce de nossa
                    instituição. Conheça as diretrizes que regem nossa comunidade.
                  </p>
                  <a href="#" className="card-etica-link">
                    <i className="fa-solid fa-file-arrow-down" />
                    Baixar documento completo
                  </a>
                </div>
              </div>
 
              <div className="categorias animacao-entrada" data-delay="4">
                <div className="categorias-cabecalho">
                  <span className="categorias-linha-decorativa" />
                  <h3 className="categorias-titulo">Categorias de Associados</h3>
                </div>
                {CATEGORIAS.map((cat) => (
                  <div key={cat.tipo} className="categoria-item" data-tipo={cat.tipo}>
                    <div className="categoria-icone"><i className={cat.icone} /></div>
                    <div className="categoria-corpo">
                      <h4 className="categoria-nome">{cat.nome}</h4>
                      <p className="categoria-descricao">{cat.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
            {/* ===== COLUNA DIREITA — FORMULÁRIO ===== */}
            <div className="hero-coluna-direita animacao-entrada" data-delay="2">
              <div className={`formulario-card${tremendo ? " tremendo" : ""}`}>
 
                <div className="formulario-cabecalho">
                  <h2 className="formulario-titulo">Formulário de adesão</h2>
                  <span className="formulario-linha-dourada" />
                  <p className="formulario-subtitulo">Informações Cadastrais</p>
                </div>
 
                <form className="formulario-adesao" onSubmit={handleSubmit} noValidate>
 
                  <div className="campo-grupo campo-grupo--completo">
                    <label htmlFor="nomeCompleto" className="campo-label">Nome Completo</label>
                    <input
                      type="text" id="nomeCompleto" name="nomeCompleto"
                      className={classeCampo("nomeCompleto")}
                      placeholder="Seu nome conforme documento"
                      autoComplete="name"
                      value={form.nomeCompleto}
                      onChange={handleChange} onBlur={handleBlur}
                    />
                    {erros.nomeCompleto && <span className="campo-erro visivel">{erros.nomeCompleto}</span>}
                  </div>
 
                  <div className="campos-linha">
                    <div className="campo-grupo">
                      <label htmlFor="email" className="campo-label">E-mail</label>
                      <input
                        type="email" id="email" name="email"
                        className={classeCampo("email")}
                        placeholder="exemplo@email.com"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange} onBlur={handleBlur}
                      />
                      {erros.email && <span className="campo-erro visivel">{erros.email}</span>}
                    </div>
                    <div className="campo-grupo">
                      <label htmlFor="cpf" className="campo-label">CPF</label>
                      <input
                        type="text" id="cpf" name="cpf"
                        className={classeCampo("cpf")}
                        placeholder="000.000.000-00"
                        maxLength={14} autoComplete="off"
                        value={form.cpf}
                        onChange={handleChange} onBlur={handleBlur}
                      />
                      {erros.cpf && <span className="campo-erro visivel">{erros.cpf}</span>}
                    </div>
                  </div>
 
                  <div className="campos-linha">
                    <div className="campo-grupo">
                      <label htmlFor="celular" className="campo-label">Celular</label>
                      <input
                        type="tel" id="celular" name="celular"
                        className={classeCampo("celular")}
                        placeholder="(00) 00000-0000"
                        maxLength={15} autoComplete="tel"
                        value={form.celular}
                        onChange={handleChange} onBlur={handleBlur}
                      />
                      {erros.celular && <span className="campo-erro visivel">{erros.celular}</span>}
                    </div>
                    <div className="campo-grupo">
                      <label htmlFor="dataNascimento" className="campo-label">Data de Nascimento</label>
                      <input
                        type="text" id="dataNascimento" name="dataNascimento"
                        className={classeCampo("dataNascimento")}
                        placeholder="dd/mm/aaaa"
                        maxLength={10} autoComplete="bday"
                        value={form.dataNascimento}
                        onChange={handleChange} onBlur={handleBlur}
                      />
                      {erros.dataNascimento && <span className="campo-erro visivel">{erros.dataNascimento}</span>}
                    </div>
                  </div>
 
                  <div className="campos-linha campos-linha--tres">
                    <div className="campo-grupo campo-grupo--cep">
                      <label htmlFor="cep" className="campo-label">CEP</label>
                      <input
                        type="text" id="cep" name="cep"
                        className={classeCampo("cep")}
                        placeholder="00000-000"
                        maxLength={9} autoComplete="postal-code"
                        value={form.cep}
                        onChange={handleChange} onBlur={handleBlur}
                      />
                      {erros.cep && <span className="campo-erro visivel">{erros.cep}</span>}
                    </div>
                    <div className="campo-grupo campo-grupo--uf">
                      <label htmlFor="uf" className="campo-label">UF</label>
                      <div className="select-wrapper">
                        <select
                          id="uf" name="uf"
                          className="campo-input campo-select"
                          value={form.uf}
                          onChange={handleChange}
                        >
                          <option value="">UF</option>
                          {UFS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                        </select>
                        <i className="fa-solid fa-chevron-down select-icone" />
                      </div>
                    </div>
                    <div className="campo-grupo campo-grupo--cidade">
                      <label htmlFor="cidade" className="campo-label">Cidade</label>
                      <input
                        type="text" id="cidade" name="cidade"
                        className={classeCampo("cidade")}
                        placeholder="Sua cidade"
                        autoComplete="address-level2"
                        value={form.cidade}
                        onChange={handleChange} onBlur={handleBlur}
                      />
                      {erros.cidade && <span className="campo-erro visivel">{erros.cidade}</span>}
                    </div>
                  </div>
 
                  <div className="campo-termos">
                    <label className="checkbox-container" htmlFor="aceitaTermos">
                      <input
                        type="checkbox" id="aceitaTermos" name="aceitaTermos"
                        checked={form.aceitaTermos}
                        onChange={handleChange}
                      />
                      <span className="checkbox-visual" />
                      <span className="checkbox-texto">
                        Li e concordo com os termos da{" "}
                        <a href="#" className="link-termos">Política de Privacidade</a>
                        {" "}e o estatuto institucional da ACB
                      </span>
                    </label>
                    {erros.aceitaTermos && (
                      <span className="campo-erro campo-erro--termos visivel">{erros.aceitaTermos}</span>
                    )}
                  </div>
 
                  <button type="submit" className="btn-enviar" disabled={enviando}>
                    <span className="btn-enviar-texto">
                      {enviando ? "Enviando..." : "Enviar dados de adesão"}
                    </span>
                    <i className={`fa-solid ${enviando ? "fa-spinner fa-spin" : "fa-arrow-right"} btn-enviar-icone`} />
                  </button>
 
                  <p className="formulario-nota">
                    * Seus dados serão processados de acordo com a LGPD e o sigilo institucional.
                  </p>
 
                </form>
              </div>
            </div>
 
          </div>
        </div>
      </section>
    </main>
  );
};
 
export default AssocieSe;