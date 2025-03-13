export const Plain = ({variante = 1, testo = "CTA"}) => {
    if (variante === 1) {
        return (
          <div>
            <button className="button-plain">
              {testo}
            </button>
          </div>
        );
      }
      if (variante === 2) {
        return (
          <div>
            <button className="button-info">
              {testo}
            </button>
          </div>
        );
      }
      if (variante === 3) {
        return (
          <div>
            <button className="button-danger">
              {testo}
            </button>
          </div>
        );
      }
}