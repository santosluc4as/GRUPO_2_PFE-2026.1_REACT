import { useState } from "react";
import { MASCARAS } from "../utils/mascaras";
import { VALIDADORES } from "../utils/validadores";

const FORM_INICIAL = {
  nomeCompleto: "",
  email: "",
  cpf: "",
  celular: "",
  dataNascimento: "",
  cep: "",
  uf: "RJ",
  cidade: "",
  aceitaTermos: false,
};

export const useFormAdesao = () => {
  const [form, setForm] = useState(FORM_INICIAL);
  const [erros, setErros] = useState({});
  const [tocados, setTocados] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [tremendo, setTremendo] = useState(false);
  const [toast, setToast] = useState(null);

  const exibirToast = (mensagem, tipo) => {
    setToast({ mensagem, tipo });
    setTimeout(() => setToast(null), 4000);
  };

  const ativarTremedeira = () => {
    setTremendo(true);
    setTimeout(() => setTremendo(false), 600);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let novoValor = type === "checkbox" ? checked : value;

    if (MASCARAS[name] && typeof novoValor === "string") {
      novoValor = MASCARAS[name](novoValor);
    }

    setForm((prev) => ({ ...prev, [name]: novoValor }));

    if (erros[name] && VALIDADORES[name]) {
      setErros((prev) => ({ ...prev, [name]: VALIDADORES[name](novoValor) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTocados((prev) => ({ ...prev, [name]: true }));
    if (VALIDADORES[name]) {
      setErros((prev) => ({ ...prev, [name]: VALIDADORES[name](value) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novosErros = {};
    Object.entries(VALIDADORES).forEach(([campo, validador]) => {
      const erro = validador(form[campo] || "");
      if (erro) novosErros[campo] = erro;
    });
    if (!form.aceitaTermos) {
      novosErros.aceitaTermos = "Você deve aceitar os termos para prosseguir.";
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      setTocados(Object.fromEntries(Object.keys(VALIDADORES).map((k) => [k, true])));
      ativarTremedeira();
      exibirToast("Verifique os campos antes de enviar.", "erro");
      return;
    }

    setEnviando(true);
    e.target.submit()
  };

  const classeCampo = (nome) => {
    if (!tocados[nome]) return "campo-input";
    if (erros[nome]) return "campo-input invalido";
    return "campo-input valido";
  };

  return {
    form,
    erros,
    enviando,
    tremendo,
    toast,
    handleChange,
    handleBlur,
    handleSubmit,
    classeCampo,
  };
};
