import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAnimacaoEntrada } from '../../hooks/useAnimacaoEntrada';

import { FaqItem } from './FaqItem';
import { faqData, getFilteredFaqData } from './faqData';
import './FaqPageStyle.css';

const destaques = [
  'Adesão e benefícios',
  'Governança e ética',
  'Eventos e capacitações',
];

export default function FaqPage() {


  const [query, setQuery] = useState('');


  useAnimacaoEntrada([query]);


  const filteredFaqData = useMemo(() => {

    if (query.trim() === '') {
      return faqData;
    }

    return getFilteredFaqData(query);
    
  }, [query]);


  return (
    <main id="conteudo-principal" className="faq-page">

      <section className="faq-hero">
        <div className="container faq-hero__grid animacao-entrada">
          <div className="faq-hero__content">
            <span className="faq-kicker">Central de Suporte</span>
            <h1 className="faq-title">Perguntas Frequentes</h1>
            <p className="faq-description">
              Encontre respostas sobre associação, governança, eventos e participação institucional.
              Se preferir, fale diretamente com nossa equipe.
            </p>

            <div className="faq-hero__actions">
              <Link to="/contato" className="btn btn--primary faq-btn">
                Falar com a equipe
              </Link>
              <Link to="/associe-se" className="btn btn--outline faq-btn">
                Quero me associar
              </Link>
            </div>
          </div>

          <aside className="faq-hero__panel" aria-label="Destaques da FAQ">
            <span className="faq-panel__badge">FAQ</span>
            <h2>Os temas mais buscados</h2>
            <p>
              Estes são os assuntos que mais ajudam quem está conhecendo a ACBrasil.
            </p>

            <ul className="faq-panel__list">
              {destaques.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-circle-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="faq-search-section">
        <div className="container faq-search__shell animacao-entrada" data-delay="1">
          <div className="faq-search__header">
            <div>
              <span className="faq-search__eyebrow">Busca rápida</span>
              <h2>Encontre uma resposta em segundos</h2>
            </div>
            <p>
              Digite uma palavra-chave, uma pergunta ou um tema para filtrar o conteúdo.
            </p>
          </div>

          <label className="sr-only" htmlFor="faqSearchInput">
            Buscar nas perguntas frequentes
          </label>
          <div className="faq-search__box">
            <i className="fa-solid fa-magnifying-glass faq-search__icon" />
            <input
              id="faqSearchInput"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busque por um tópico ou palavra-chave..."
              autoComplete="off"
            />
          </div>

          <p className="faq-search__count">
            {filteredFaqData.length} categoria{filteredFaqData.length === 1 ? '' : 's'} encontrada{filteredFaqData.length === 1 ? '' : 's'}
          </p>
        </div>
      </section>

      <section className="faq-content-section">
        <div className="container faq-layout">
          <aside className="faq-support-card animacao-entrada" data-delay="1">
            <span className="faq-support-card__eyebrow">Ainda com dúvidas?</span>
            <h2>Fale com nossa equipe</h2>
            <p>
              Se a resposta que você procura não estiver aqui, podemos orientar pelo canal de contato.
            </p>

            <div className="faq-support-card__actions">
              <Link to="/contato" className="btn btn--primary faq-btn faq-btn--full">
                Entrar em contato
              </Link>
              <Link to="/sobre" className="btn btn--ghost faq-btn faq-btn--ghost">
                Conhecer a ACB
              </Link>
            </div>
          </aside>

          <div className="faq-accordion" id="faqAccordion">
            {filteredFaqData.length ? (
              filteredFaqData.map((grupo, groupIndex) => (
                <section className="faq-group animacao-entrada" data-delay={groupIndex + 1} key={grupo.categoria}>
                  <div className="faq-group__header">
                    <span className="faq-group__number">{String(groupIndex + 1).padStart(2, '0')}.</span>
                    <h2>{grupo.categoria}</h2>
                  </div>

                  <div className="faq-list">
                    {grupo.perguntas.map((item, itemIndex) => 
                      <FaqItem
                        key={item.pergunta}
                        pergunta={item.pergunta}
                        resposta={item.resposta}
                      />
                    )}
                  </div>
                </section>
              ))
            ) : (
              <div className="faq-empty animacao-entrada" data-delay="1">
                <h2>Nenhum resultado encontrado</h2>
                <p>
                  Tente outro termo de busca ou limpe o campo para exibir todas as categorias novamente.
                </p>
                <button type="button" className="btn btn--primary faq-btn" onClick={() => setQuery('')}>
                  Limpar busca
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}