import { useState, useEffect } from 'react';
import { useAnimacaoEntrada } from '../../hooks/useAnimacaoEntrada';
import { formatNumber, formatCurrency, formatPercent } from './dadosHome';

const json = (res) => res.json();

export default function IndicadoresSection() {
  const [indicators, setIndicators] = useState(null);
  const [error, setError] = useState(false);
  const [updateTime, setUpdateTime] = useState(null);

  useAnimacaoEntrada([indicators]);

  useEffect(() => {
    async function fetchIndicators() {
      try {
        const [hgResult, taxasResult] = await Promise.allSettled([
          fetch('https://api.hgbrasil.com/finance?format=json-cors&key=13361516').then(json),
          fetch('https://brasilapi.com.br/api/taxas/v1').then(json),
        ]);

        if (hgResult.status === 'rejected') { setError(true); return; }

        const { stocks, currencies } = hgResult.value.results;

        const taxas = taxasResult.status === 'fulfilled' ? taxasResult.value : [];
        const getTaxa = (nome) => taxas.find((t) => t.nome === nome)?.valor ?? null;

        const cdi   = getTaxa('CDI');
        const ipca  = getTaxa('IPCA');
        const selic = getTaxa('Selic');

        // Variação calculada comparando com o valor do dia anterior via localStorage
        const PREV_KEY = 'acbrasil_taxas_prev';
        const today = new Date().toISOString().split('T')[0];
        let varCdi = null, varIpca = null, varSelic = null;

        try {
          const stored = JSON.parse(localStorage.getItem(PREV_KEY));
          if (stored && stored.date !== today) {
            varCdi   = cdi   != null && stored.cdi   != null ? cdi   - stored.cdi   : null;
            varIpca  = ipca  != null && stored.ipca  != null ? ipca  - stored.ipca  : null;
            varSelic = selic != null && stored.selic != null ? selic - stored.selic : null;
            localStorage.setItem(PREV_KEY, JSON.stringify({ date: today, cdi, ipca, selic }));
          } else if (!stored) {
            localStorage.setItem(PREV_KEY, JSON.stringify({ date: today, cdi, ipca, selic }));
          }
        } catch { /* ignora variação indisponível */ }

        setIndicators([
          {
            name: 'Ibovespa',
            value: formatNumber(stocks.IBOVESPA.points),
            variation: stocks.IBOVESPA.variation,
            unit: ' pts',
          },
          {
            name: 'Dólar',
            value: formatCurrency(currencies.USD.buy),
            variation: currencies.USD.variation,
            unit: '',
          },
          {
            name: 'CDI',
            value: cdi != null ? formatPercent(cdi) : 'N/D',
            variation: varCdi,
            unit: '',
          },
          {
            name: 'IPCA',
            value: ipca != null ? formatPercent(ipca) : 'N/D',
            variation: varIpca,
            unit: '',
          },
          {
            name: 'Selic',
            value: selic != null ? formatPercent(selic) : 'N/D',
            variation: varSelic,
            unit: '',
          },
        ]);

        const now = new Date();
        setUpdateTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
      } catch {
        setError(true);
      }
    }
    fetchIndicators();
  }, []);

  return (
    <section className="indicators-section animacao-entrada" data-delay="1">
      <div className="container">
        <div className="indicators-header">
          <h2>Indicadores Econômicos</h2>
          <span className="update-rate">
            {updateTime ? `Atualizado hoje às ${updateTime}` : 'Atualizando...'}
          </span>
        </div>
        <p className="indicators-subtitle">Monitoramento em tempo real</p>
        <div className="indicators-grid">
          {error ? (
            <p style={{ color: 'red', gridColumn: '1/-1' }}>
              Erro ao carregar dados do mercado. Tente novamente mais tarde.
            </p>
          ) : !indicators ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="indicator-card loading-skeleton" />
            ))
          ) : (
            indicators.map((ind) => {
              const pos = ind.variation > 0;
              const neg = ind.variation < 0;
              return (
                <div key={ind.name} className="indicator-card">
                  <div className="indicator-name">{ind.name}</div>
                  <div className="indicator-value">{ind.value}{ind.unit}</div>
                  {ind.variation != null ? (
                    <div className={`indicator-variation ${pos ? 'variation-positive' : neg ? 'variation-negative' : ''}`}>
                      {pos && <i className="fas fa-caret-up" />}
                      {neg && <i className="fas fa-caret-down" />}
                      {' '}{pos ? '+' : ''}{ind.variation.toFixed(2).replace('.', ',')}%
                    </div>
                  ) : (
                    <div className="indicator-variation" style={{ color: 'rgba(255,255,255,0.35)' }}>—</div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
