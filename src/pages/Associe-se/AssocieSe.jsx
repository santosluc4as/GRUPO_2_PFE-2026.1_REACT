import { useState, useEffect, useRef, useCallback } from "react";

/* ==========================================================================
   MÁSCARAS
   ========================================================================== */
const aplicarMascaraCPF = (v) => {
  v = v.replace(/\D/g, "").slice(0, 11);
  if (v.length > 9) return v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  if (v.length > 6) return v.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  if (v.length > 3) return v.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  return v;
};

const aplicarMascaraCelular = (v) => {
  v = v.replace(/\D/g, "").slice(0, 11);
  if (v.length > 7) return v.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
  if (v.length > 2) return v.replace(/(\d{2})(\d{1,5})/, "($1) $2");
  if (v.length > 0) return v.replace(/(\d{1,2})/, "($1");
  return v;
};

const aplicarMascaraData = (v) => {
  v = v.replace(/\D/g, "").slice(0, 8);
  if (v.length > 4) return v.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
  if (v.length > 2) return v.replace(/(\d{2})(\d{1,2})/, "$1/$2");
  return v;
};

const aplicarMascaraCEP = (v) => {
  v = v.replace(/\D/g, "").slice(0, 8);
  if (v.length > 5) return v.replace(/(\d{5})(\d{1,3})/, "$1-$2");
  return v;
};

/* ==========================================================================
   VALIDADORES
   ========================================================================== */
const validarNome = (v) => {
  if (!v.trim()) return "O nome completo é obrigatório.";
  if (v.trim().split(" ").length < 2) return "Informe nome e sobrenome.";
  if (v.trim().length < 5) return "Nome muito curto.";
  return null;
};
const validarEmail = (v) => {
  if (!v.trim()) return "O e-mail é obrigatório.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Informe um e-mail válido.";
  return null;
};
const validarCPF = (v) => {
  const d = v.replace(/\D/g, "");
  if (!d) return "O CPF é obrigatório.";
  if (d.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(d)) return "CPF inválido.";
  let s = 0;
  for (let i = 0; i < 9; i++) s += parseInt(d[i]) * (10 - i);
  let r = (s * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  if (r !== parseInt(d[9])) return "CPF inválido.";
  s = 0;
  for (let i = 0; i < 10; i++) s += parseInt(d[i]) * (11 - i);
  r = (s * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  if (r !== parseInt(d[10])) return "CPF inválido.";
  return null;
};
const validarCelular = (v) => {
  const d = v.replace(/\D/g, "");
  if (!d) return "O celular é obrigatório.";
  if (d.length < 10 || d.length > 11) return "Celular inválido.";
  return null;
};
const validarData = (v) => {
  if (!v.trim()) return "A data de nascimento é obrigatória.";
  const match = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return "Formato inválido. Use dd/mm/aaaa.";
  const [, dia, mes, ano] = match;
  const data = new Date(`${ano}-${mes}-${dia}`);
  if (isNaN(data.getTime())) return "Data inválida.";
  const idade = new Date().getFullYear() - parseInt(ano);
  if (idade < 18 || idade > 120) return "Idade inválida.";
  return null;
};
const validarCEP = (v) => {
  const d = v.replace(/\D/g, "");
  if (!d) return "O CEP é obrigatório.";
  if (d.length !== 8) return "CEP deve ter 8 dígitos.";
  return null;
};
const validarCidade = (v) => {
  if (!v.trim()) return "A cidade é obrigatória.";
  if (v.trim().length < 2) return "Nome de cidade inválido.";
  return null;
};

const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

/* ==========================================================================
   TOAST
   ========================================================================== */
function Toast({ toast }) {
  const iconMap = { sucesso: "fa-circle-check", erro: "fa-circle-exclamation", info: "fa-circle-info" };
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-hidden={!toast.visible}
      style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 9999,
        display: "flex", alignItems: "center", gap: 12,
        background: toast.tipo === "sucesso" ? "#1a3a2a" : toast.tipo === "erro" ? "#3a1a1a" : "#1a2a3a",
        color: "#fff", padding: "14px 22px", borderRadius: 10,
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        borderLeft: `4px solid ${toast.tipo === "sucesso" ? "#4caf7d" : toast.tipo === "erro" ? "#e05c5c" : "#5c9ae0"}`,
        opacity: toast.visible ? 1 : 0,
        transform: toast.visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s, transform 0.3s",
        pointerEvents: toast.visible ? "auto" : "none",
        maxWidth: 380, fontSize: 14,
      }}
    >
      <i className={`fa-solid ${iconMap[toast.tipo] || iconMap.info}`}
        style={{ color: toast.tipo === "sucesso" ? "#4caf7d" : toast.tipo === "erro" ? "#e05c5c" : "#5c9ae0", fontSize: 18 }} />
      <span>{toast.mensagem}</span>
    </div>
  );
}

/* ==========================================================================
   CAMPO DE FORMULÁRIO
   ========================================================================== */
function CampoGrupo({ label, children, erro, touched }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#8a7a5a", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </label>
      {children}
      {touched && erro && (
        <span style={{ fontSize: 11, color: "#e05c5c", display: "flex", alignItems: "center", gap: 4 }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: 10 }} /> {erro}
        </span>
      )}
    </div>
  );
}

const inputStyle = (erro, touched, extra = {}) => ({
  width: "100%", padding: "10px 14px", borderRadius: 7, fontSize: 14,
  border: `1.5px solid ${touched && erro ? "#e05c5c" : touched && !erro ? "#4caf7d" : "#d6c9a8"}`,
  background: "#fdf9f2", color: "#2c2416", outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
  ...extra,
});

/* ==========================================================================
   CATEGORIA ITEM
   ========================================================================== */
function CategoriaItem({ icon, nome, descricao }) {
  return (
    <div style={{
      display: "flex", gap: 16, padding: "18px 0",
      borderBottom: "1px solid #e8dfc8",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
        background: "linear-gradient(135deg, #c8971a, #a07614)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 18,
      }}>
        <i className={`fa-solid ${icon}`} />
      </div>
      <div>
        <h4 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "#2c2416" }}>{nome}</h4>
        <p style={{ margin: 0, fontSize: 13, color: "#6b5c3a", lineHeight: 1.6 }}>{descricao}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================== */
export default function AssocieSe() {
  const [fields, setFields] = useState({
    nomeCompleto: "", email: "", cpf: "", celular: "",
    dataNascimento: "", cep: "", uf: "RJ", cidade: "", aceitaTermos: false,
  });
  const [touched, setTouched] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState({ visible: false, mensagem: "", tipo: "info" });
  const toastTimer = useRef(null);

  const exibirToast = useCallback((mensagem, tipo = "info") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ visible: true, mensagem, tipo });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000);
  }, []);

  const validators = {
    nomeCompleto: validarNome, email: validarEmail, cpf: validarCPF,
    celular: validarCelular, dataNascimento: validarData, cep: validarCEP, cidade: validarCidade,
  };

  const erros = Object.fromEntries(
    Object.entries(validators).map(([k, fn]) => [k, fn(fields[k])])
  );
  if (!fields.aceitaTermos) erros.aceitaTermos = "Você deve aceitar os termos para prosseguir.";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let v = type === "checkbox" ? checked : value;
    if (name === "cpf") v = aplicarMascaraCPF(value);
    if (name === "celular") v = aplicarMascaraCelular(value);
    if (name === "dataNascimento") v = aplicarMascaraData(value);
    if (name === "cep") v = aplicarMascaraCEP(value);
    setFields((f) => ({ ...f, [name]: v }));
    if (touched[name]) setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(validators).concat("aceitaTermos").map((k) => [k, true]));
    setTouched(allTouched);

    const hasErrors = Object.values(erros).some(Boolean);
    if (hasErrors) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      exibirToast("Verifique os campos antes de enviar.", "erro");
      return;
    }

    setEnviando(true);
    setTimeout(() => {
      exibirToast("Dados enviados com sucesso! Em breve entraremos em contato.", "sucesso");
      setFields({ nomeCompleto: "", email: "", cpf: "", celular: "", dataNascimento: "", cep: "", uf: "RJ", cidade: "", aceitaTermos: false });
      setTouched({});
      setEnviando(false);
    }, 1800);
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes tremendo {
          0%,100%{transform:translateX(0)}
          15%{transform:translateX(-8px)}
          30%{transform:translateX(8px)}
          45%{transform:translateX(-6px)}
          60%{transform:translateX(6px)}
          75%{transform:translateX(-3px)}
          90%{transform:translateX(3px)}
        }
        .shake { animation: tremendo 0.55s ease-in-out; }
        .campo-input:focus { border-color: #c8971a !important; box-shadow: 0 0 0 3px rgba(200,151,26,0.13); }
        .select-wrapper { position: relative; }
        .select-wrapper select { appearance: none; cursor: pointer; padding-right: 32px; }
        .select-icone { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #8a7a5a; font-size: 12px; }
        .btn-enviar:hover:not(:disabled) { background: linear-gradient(135deg, #a07614, #c8971a) !important; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(200,151,26,0.38) !important; }
        .btn-enviar:disabled { opacity: 0.7; cursor: not-allowed; }
        .categoria-item:last-child { border-bottom: none; }
      `}</style>

      <div style={{ fontFamily: "'Montserrat', sans-serif", background: "#fdf9f2", minHeight: "100vh" }}>

        {/* ===== HERO ===== */}
        <section style={{ padding: "80px 24px 64px", maxWidth: 1180, margin: "0 auto" }}>

          {/* Rótulo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ width: 32, height: 2, background: "#c8971a", display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8971a" }}>
              Conselho de Excelência
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

            {/* ===== COLUNA ESQUERDA ===== */}
            <div>
              <h1 style={{
                fontFamily: "'Newsreader', serif", fontSize: "clamp(36px, 4vw, 54px)",
                fontWeight: 700, color: "#1a1206", lineHeight: 1.15, margin: "0 0 20px",
              }}>
                Torne-se parte<br />
                <em style={{ color: "#c8971a", fontStyle: "italic" }}>da nossa história</em>
              </h1>

              <p style={{ fontSize: 15, color: "#5c4e30", lineHeight: 1.75, margin: "0 0 32px", maxWidth: 480 }}>
                A ACB reúne conselheiros comprometidos com a boa governança, a ética corporativa e o desenvolvimento
                sustentável das organizações brasileiras. Ao se associar, você passa a integrar uma rede de profissionais
                que atuam na transformação das estruturas de decisão do país.
              </p>

              {/* Card ética */}
              <div style={{
                display: "flex", gap: 0, borderRadius: 12, overflow: "hidden",
                boxShadow: "0 4px 24px rgba(44,36,22,0.10)", marginBottom: 40,
              }}>
                <div style={{ width: 5, background: "linear-gradient(180deg, #c8971a, #a07614)", flexShrink: 0 }} />
                <div style={{ background: "#fff", padding: "24px 28px" }}>
                  <h2 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: "#1a1206" }}>
                    Código de Ética e Conduta
                  </h2>
                  <p style={{ margin: "0 0 16px", fontSize: 13, color: "#5c4e30", lineHeight: 1.6 }}>
                    O compromisso com a transparência e o rigor moral é o alicerce de nossa instituição.
                    Conheça as diretrizes que regem nossa comunidade.
                  </p>
                  <a href="#" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontSize: 13, fontWeight: 600, color: "#c8971a", textDecoration: "none",
                  }}>
                    <i className="fa-solid fa-file-arrow-down" /> Baixar documento completo
                  </a>
                </div>
              </div>

              {/* Categorias */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                  <span style={{ flex: 1, height: 1, background: "#d6c9a8" }} />
                  <h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8a7a5a" }}>
                    Categorias de Associados
                  </h3>
                </div>

                <CategoriaItem
                  icon="fa-building-columns" nome="Associado Mantenedor"
                  descricao="Pessoa jurídica que faça espontaneamente contribuições financeiras, doações ou cessão de recursos humanos e/ou materiais, considerados relevantes para o desenvolvimento da ACBrasil."
                />
                <CategoriaItem
                  icon="fa-user-tie" nome="Associado Efetivo"
                  descricao="Pessoa física ou jurídica que se proponha a colaborar na realização dos fins da Associação, obrigando-se ao pagamento da mensalidade nos montantes fixados pela Assembleia Geral."
                />
                <CategoriaItem
                  icon="fa-award" nome="Associado Benemérito"
                  descricao="Todo aquele merecedor de especial reconhecimento, em razão de contribuições relevantes para o desenvolvimento da ACBrasil."
                />
              </div>
            </div>

            {/* ===== COLUNA DIREITA — FORMULÁRIO ===== */}
            <div>
              <div
                className={shake ? "shake" : ""}
                style={{
                  background: "#fff", borderRadius: 16,
                  boxShadow: "0 8px 48px rgba(44,36,22,0.13)",
                  padding: "36px 32px",
                  border: "1px solid #e8dfc8",
                }}
              >
                {/* Cabeçalho do formulário */}
                <div style={{ marginBottom: 28 }}>
                  <h2 style={{ margin: "0 0 8px", fontFamily: "'Newsreader', serif", fontSize: 24, fontWeight: 700, color: "#1a1206" }}>
                    Formulário de adesão
                  </h2>
                  <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #c8971a, #e8bc4a)", borderRadius: 2, marginBottom: 8 }} />
                  <p style={{ margin: 0, fontSize: 13, color: "#8a7a5a", fontWeight: 500 }}>Informações Cadastrais</p>
                </div>

                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                  {/* Nome completo */}
                  <CampoGrupo label="Nome Completo" erro={erros.nomeCompleto} touched={touched.nomeCompleto}>
                    <input
                      type="text" name="nomeCompleto" className="campo-input"
                      placeholder="Seu nome conforme documento"
                      value={fields.nomeCompleto}
                      onChange={handleChange} onBlur={handleBlur}
                      style={inputStyle(erros.nomeCompleto, touched.nomeCompleto)}
                      autoComplete="name"
                    />
                  </CampoGrupo>

                  {/* Email + CPF */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <CampoGrupo label="E-mail" erro={erros.email} touched={touched.email}>
                      <input
                        type="email" name="email" className="campo-input"
                        placeholder="exemplo@email.com"
                        value={fields.email}
                        onChange={handleChange} onBlur={handleBlur}
                        style={inputStyle(erros.email, touched.email)}
                        autoComplete="email"
                      />
                    </CampoGrupo>
                    <CampoGrupo label="CPF" erro={erros.cpf} touched={touched.cpf}>
                      <input
                        type="text" name="cpf" className="campo-input"
                        placeholder="000.000.000-00" maxLength={14}
                        value={fields.cpf}
                        onChange={handleChange} onBlur={handleBlur}
                        style={inputStyle(erros.cpf, touched.cpf)}
                        autoComplete="off"
                      />
                    </CampoGrupo>
                  </div>

                  {/* Celular + Data */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <CampoGrupo label="Celular" erro={erros.celular} touched={touched.celular}>
                      <input
                        type="tel" name="celular" className="campo-input"
                        placeholder="(00) 00000-0000" maxLength={15}
                        value={fields.celular}
                        onChange={handleChange} onBlur={handleBlur}
                        style={inputStyle(erros.celular, touched.celular)}
                        autoComplete="tel"
                      />
                    </CampoGrupo>
                    <CampoGrupo label="Data de Nascimento" erro={erros.dataNascimento} touched={touched.dataNascimento}>
                      <input
                        type="text" name="dataNascimento" className="campo-input"
                        placeholder="dd/mm/aaaa" maxLength={10}
                        value={fields.dataNascimento}
                        onChange={handleChange} onBlur={handleBlur}
                        style={inputStyle(erros.dataNascimento, touched.dataNascimento)}
                        autoComplete="bday"
                      />
                    </CampoGrupo>
                  </div>

                  {/* CEP + UF + Cidade */}
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr", gap: 14 }}>
                    <CampoGrupo label="CEP" erro={erros.cep} touched={touched.cep}>
                      <input
                        type="text" name="cep" className="campo-input"
                        placeholder="00000-000" maxLength={9}
                        value={fields.cep}
                        onChange={handleChange} onBlur={handleBlur}
                        style={inputStyle(erros.cep, touched.cep)}
                        autoComplete="postal-code"
                      />
                    </CampoGrupo>
                    <CampoGrupo label="UF" erro={null} touched={false}>
                      <div className="select-wrapper">
                        <select
                          name="uf" className="campo-input"
                          value={fields.uf}
                          onChange={handleChange}
                          style={inputStyle(null, false, { paddingRight: 32 })}
                        >
                          <option value="">UF</option>
                          {UFS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                        </select>
                        <i className="fa-solid fa-chevron-down select-icone" />
                      </div>
                    </CampoGrupo>
                    <CampoGrupo label="Cidade" erro={erros.cidade} touched={touched.cidade}>
                      <input
                        type="text" name="cidade" className="campo-input"
                        placeholder="Sua cidade"
                        value={fields.cidade}
                        onChange={handleChange} onBlur={handleBlur}
                        style={inputStyle(erros.cidade, touched.cidade)}
                        autoComplete="address-level2"
                      />
                    </CampoGrupo>
                  </div>

                  {/* Termos */}
                  <div>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                      <input
                        type="checkbox" name="aceitaTermos"
                        checked={fields.aceitaTermos}
                        onChange={handleChange}
                        style={{ marginTop: 2, accentColor: "#c8971a", width: 16, height: 16, flexShrink: 0 }}
                      />
                      <span style={{ fontSize: 13, color: "#5c4e30", lineHeight: 1.5 }}>
                        Li e concordo com os termos da{" "}
                        <a href="#" style={{ color: "#c8971a", fontWeight: 600, textDecoration: "none" }}>Política de Privacidade</a>
                        {" "}e o estatuto institucional da ACB
                      </span>
                    </label>
                    {touched.aceitaTermos && erros.aceitaTermos && (
                      <span style={{ display: "block", marginTop: 4, fontSize: 11, color: "#e05c5c" }}>
                        <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: 10 }} /> {erros.aceitaTermos}
                      </span>
                    )}
                  </div>

                  {/* Botão */}
                  <button
                    type="submit" className="btn-enviar"
                    disabled={enviando}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      padding: "14px 28px", borderRadius: 8, border: "none", cursor: "pointer",
                      background: "linear-gradient(135deg, #c8971a, #a07614)",
                      color: "#fff", fontWeight: 700, fontSize: 15,
                      boxShadow: "0 4px 16px rgba(200,151,26,0.28)",
                      transition: "all 0.2s", fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    <span>{enviando ? "Enviando..." : "Enviar dados de adesão"}</span>
                    <i className={`fa-solid ${enviando ? "fa-spinner fa-spin" : "fa-arrow-right"}`} />
                  </button>

                  <p style={{ margin: 0, fontSize: 11, color: "#8a7a5a", textAlign: "center" }}>
                    * Seus dados serão processados de acordo com a LGPD e o sigilo institucional.
                  </p>

                </form>
              </div>
            </div>

          </div>
        </section>

        {/* ===== RODAPÉ ===== */}
        <footer style={{ background: "#13100a", color: "#c8b896", padding: "56px 24px 0" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 48, paddingBottom: 48 }}>

              <div>
                <p style={{ fontSize: 14, color: "#8a7a5a", lineHeight: 1.7, marginTop: 0 }}>
                  Transformando a governança em crescimento, confiança e futuro para as empresas brasileiras desde 2022.
                </p>
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  {[
                    { icon: "fa-share-nodes", href: "#" },
                    { icon: "fa-linkedin-in", href: "https://www.linkedin.com/company/associacao-de-conselheiros-do-brasil/", brand: true },
                    { icon: "fa-youtube", href: "https://www.youtube.com/@acbrasil", brand: true },
                    { icon: "fa-instagram", href: "https://www.instagram.com/acbrasil.oficial/", brand: true },
                    { icon: "fa-whatsapp", href: "#", brand: true },
                  ].map(({ icon, href, brand }, i) => (
                    <a key={i} href={href} target={href !== "#" ? "_blank" : undefined} rel="noopener noreferrer"
                      style={{
                        width: 36, height: 36, borderRadius: 8, background: "#1e1a12",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#8a7a5a", textDecoration: "none", transition: "color 0.2s, background 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#c8971a"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#1e1a12"; e.currentTarget.style.color = "#8a7a5a"; }}
                    >
                      <i className={`fa-${brand ? "brands" : "solid"} ${icon}`} style={{ fontSize: 14 }} />
                    </a>
                  ))}
                </div>
              </div>

              {[
                {
                  titulo: "Navegação",
                  links: [["Notícias", "newsletter.html"], ["Contato", "contato.html"], ["Insights", "insights.html"], ["Sobre nós", "sobre.html"], ["FAQ", "faq.html"]],
                },
                {
                  titulo: "Associados",
                  links: [["Torne-se Membro", "#"], ["Portal Privado", "#"], ["Benefícios", "#"]],
                },
              ].map(({ titulo, links }) => (
                <div key={titulo}>
                  <h2 style={{ margin: "0 0 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8971a" }}>{titulo}</h2>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {links.map(([label, href]) => (
                      <li key={label}>
                        <a href={href} style={{ fontSize: 13, color: "#8a7a5a", textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = "#c8971a"}
                          onMouseLeave={(e) => e.currentTarget.style.color = "#8a7a5a"}
                        >{label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h2 style={{ margin: "0 0 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8971a" }}>Suporte Institucional</h2>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { icon: "fa-envelope", content: <a href="mailto:contato@acbrasil.org" style={{ color: "#8a7a5a", textDecoration: "none" }}>contato@acbrasil.org</a> },
                    { icon: "fa-phone", content: <a href="tel:+5521100000000" style={{ color: "#8a7a5a", textDecoration: "none" }}>+55 (21) 1000-0000</a> },
                    { icon: "fa-location-dot", content: <span style={{ color: "#8a7a5a" }}>Av. das Américas, 1000 - RJ</span> },
                  ].map(({ icon, content }, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                      <i className={`fa-solid ${icon}`} style={{ color: "#c8971a", width: 16, flexShrink: 0 }} />
                      {content}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <div style={{
              borderTop: "1px solid #1e1a12", padding: "20px 0",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexWrap: "wrap", gap: 12,
            }}>
              <p style={{ margin: 0, fontSize: 12, color: "#4a3e28" }}>
                © 2026 Associação de Conselheiros do Brasil. Todos os direitos reservados.
              </p>
              <div style={{ display: "flex", gap: 20 }}>
                {["Política de Cookies", "Política de Privacidade"].map((label) => (
                  <a key={label} href="#" style={{ fontSize: 12, color: "#4a3e28", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#c8971a"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#4a3e28"}
                  >{label}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>

      <Toast toast={toast} />
    </>
  );
}
