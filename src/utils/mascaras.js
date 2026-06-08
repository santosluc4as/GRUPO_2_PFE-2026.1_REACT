/**
 * Utilitários de máscara para inputs do formulário de adesão
 */

export const aplicarMascaraCPF = (valor) => {
  valor = valor.replace(/\D/g, '').slice(0, 11);
  if (valor.length > 9) return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  if (valor.length > 6) return valor.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  if (valor.length > 3) return valor.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  return valor;
};

export const aplicarMascaraCelular = (valor) => {
  valor = valor.replace(/\D/g, '').slice(0, 11);
  if (valor.length > 7) return valor.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
  if (valor.length > 2) return valor.replace(/(\d{2})(\d{1,5})/, '($1) $2');
  if (valor.length > 0) return valor.replace(/(\d{1,2})/, '($1');
  return valor;
};

export const aplicarMascaraData = (valor) => {
  valor = valor.replace(/\D/g, '').slice(0, 8);
  if (valor.length > 4) return valor.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
  if (valor.length > 2) return valor.replace(/(\d{2})(\d{1,2})/, '$1/$2');
  return valor;
};

export const aplicarMascaraCEP = (valor) => {
  valor = valor.replace(/\D/g, '').slice(0, 8);
  if (valor.length > 5) return valor.replace(/(\d{5})(\d{1,3})/, '$1-$2');
  return valor;
};

export const MASCARAS = {
  cpf: aplicarMascaraCPF,
  celular: aplicarMascaraCelular,
  dataNascimento: aplicarMascaraData,
  cep: aplicarMascaraCEP,
};
