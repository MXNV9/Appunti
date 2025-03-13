export const Rounded = ({ testo = 'CTA', variante = 1 }) => {
  if (variante === 1) {
    return (
      <div>
        <button className="round-btn-plain">{testo}</button>
      </div>
    );
  }
  if (variante === 2) {
    return (
      <div>
        <button className="round-btn-info">{testo}</button>
      </div>
    );
  }
  if (variante === 3) {
    return (
      <div>
        <button className="round-btn-danger">{testo}</button>
      </div>
    );
  }
  if (variante !== 1 && variante !== 2 && variante !== 3) {
    return (
      <div className="round-btn-danger">
        <button>{testo}</button>
      </div>
    );
  }
};
