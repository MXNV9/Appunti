export const Forato = ({ testo = 'CTA', variante = 1 }) => {
  if (variante === 1) {
    return (
      <div>
        <button className="dashed-effect-button-plain">
          <div className="dash-top-left"></div>
          <div className="dash-bottom-right"></div>
          {testo}
        </button>
      </div>
    );
  }
  if (variante === 2) {
    return (
      <div>
        <button className="dashed-effect-button-info">
          <div className="dash-top-left"></div>
          <div className="dash-bottom-right"></div>
          {testo}
        </button>
      </div>
    );
  }
  if (variante === 3) {
    return (
      <div>
        <button className="dashed-effect-button-danger">
          <div className="dash-top-left"></div>
          <div className="dash-bottom-right"></div>
          {testo}
        </button>
      </div>
    );
  }
};
