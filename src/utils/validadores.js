/**
 * Funções de validação para o formulário de adesão
 * Cada função retorna null se válido ou uma string de erro
 */

export const validarNome = (v) => {
  if (!v.trim()) return 'O nome completo é obrigatório.';
  if (v.trim().split(' ').length < 2) return 'Informe nome e sobrenome.';
  if (v.trim().length < 5) return 'Nome muito curto.';
  return null;
};

export const validarEmail = (v) => {
  if (!v.trim()) return 'O e-mail é obrigatório.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Informe um e-mail válido.';
  return null;
};

export const validarCPF = (v) => {
  const d = v.replace(/\D/g, '');
  if (!d) return 'O CPF é obrigatório.';
  if (d.length !== 11) return 'CPF deve ter 11 dígitos.';
  if (/^(\d)\1{10}$/.test(d)) return 'CPF inválido.';
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(d[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(d[9])) return 'CPF inválido.';
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(d[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(d[10])) return 'CPF inválido.';
  return null;
};

export const validarCelular = (v) => {
  const d = v.replace(/\D/g, '');
  if (!d) return 'O celular é obrigatório.';
  if (d.length < 10 || d.length > 11) return 'Celular inválido.';
  return null;
};

export const validarData = (v) => {
  if (!v.trim()) return 'A data de nascimento é obrigatória.';
  const match = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return 'Formato inválido. Use dd/mm/aaaa.';
  const [, dia, mes, ano] = match;
  const data = new Date(`${ano}-${mes}-${dia}`);
  if (isNaN(data.getTime())) return 'Data inválida.';
  const idade = new Date().getFullYear() - parseInt(ano);
  if (idade < 18 || idade > 120) return 'Idade inválida.';
  return null;
};

export const validarCEP = (v) => {
  const d = v.replace(/\D/g, '');
  if (!d) return 'O CEP é obrigatório.';
  if (d.length !== 8) return 'CEP deve ter 8 dígitos.';
  return null;
};

export const validarCidade = (v) => {
  if (!v.trim()) return 'A cidade é obrigatória.';
  if (v.trim().length < 2) return 'Nome de cidade inválido.';
  return null;
};

export const VALIDADORES = {
  nomeCompleto: validarNome,
  email: validarEmail,
  cpf: validarCPF,
  celular: validarCelular,
  dataNascimento: validarData,
  cep: validarCEP,
  cidade: validarCidade,
};
