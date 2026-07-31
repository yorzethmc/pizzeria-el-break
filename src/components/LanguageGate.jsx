export default function LanguageGate({ onSelect }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="language-gate" role="dialog" aria-modal="true" aria-labelledby="language-gate-title">
        <h2 id="language-gate-title">Selecciona tu idioma / Choose your language</h2>
        <p>Elige el idioma para ver el menu. / Select a language to view the menu.</p>
        <div className="language-gate__options">
          <button type="button" className="primary-button" onClick={() => onSelect("es")}>
            🇨🇷 Español
          </button>
          <button type="button" className="primary-button" onClick={() => onSelect("en")}>
            🇺🇸 English
          </button>
        </div>
      </section>
    </div>
  );
}
