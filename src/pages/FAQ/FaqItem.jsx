export function FaqItem({ pergunta, resposta }) {
  return (
    <details className="faq-item" name="faq-item">
      <summary className="faq-question">
        <span>{pergunta}</span>
        <i className="fa-solid fa-chevron-down faq-question__icon" />
      </summary>

      <div className="faq-answer">
        <p>{resposta}</p>
      </div>
    </details>
  );
}