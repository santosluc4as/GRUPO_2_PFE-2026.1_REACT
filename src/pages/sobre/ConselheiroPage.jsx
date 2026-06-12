import { useParams, Link, Navigate } from 'react-router-dom';
import { fundadores } from './dadosSobre';
import { useAnimacaoEntrada } from '../../hooks/useAnimacaoEntrada';
import './Sobre.css';

/**
 * ConselheiroPage — Página de perfil individual de um conselheiro fundador.
 * Acessa o slug da URL para encontrar o conselheiro no array de fundadores.
 */
const ConselheiroPage = () => {
  const { slug } = useParams();
  useAnimacaoEntrada();

  const conselheiro = fundadores.find((f) => f.slug === slug);

  // Se o slug não corresponder a nenhum conselheiro, redireciona para /sobre
  if (!conselheiro) {
    return <Navigate to="/sobre" replace />;
  }

  return (
    <main className="conselheiro-page">
      <div className="container conselheiro-container">
        {/* Breadcrumb */}
        <nav className="conselheiro-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Início</Link>
          <span className="breadcrumb-separator" aria-hidden="true">&gt;</span>
          <Link to="/sobre">Quem somos</Link>
          <span className="breadcrumb-separator" aria-hidden="true">&gt;</span>
          <span aria-current="page">{conselheiro.nomeCompleto}</span>
        </nav>

        {/* Título da seção */}
        <h1 className="conselheiro-titulo animacao-entrada">Associados fundadores</h1>

        {/* Perfil */}
        <div className="conselheiro-perfil animacao-entrada" data-delay="1">
          <div className="conselheiro-foto-wrapper">
            <img
              src={conselheiro.img}
              alt={`Foto de ${conselheiro.nomeCompleto}`}
              className="conselheiro-foto"
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="conselheiro-info">
            <h2 className="conselheiro-nome">{conselheiro.nomeCompleto}</h2>
            <p className="conselheiro-descricao">{conselheiro.descricao}</p>
          </div>
        </div>

        {/* Botão de voltar */}
        <div className="conselheiro-voltar-wrapper animacao-entrada" data-delay="2">
          <Link to="/sobre" className="conselheiro-voltar">
            <span aria-hidden="true">&larr;</span> TODOS OS ASSOCIADOS
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ConselheiroPage;
