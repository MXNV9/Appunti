export const Plain = ({ variante = 'default', testo = 'CTA' }) => {
  if (variante === 'default') {
    return (
      <div>
        <button className="button-plain">{testo}</button>
      </div>
    );
  }
  if (variante === 'info') {
    return (
      <div>
        <button className="button-info">{testo}</button>
      </div>
    );
  }
  if (variante === 'danger') {
    return (
      <div>
        <button className="button-danger">{testo}</button>
      </div>
    );
  }
};
