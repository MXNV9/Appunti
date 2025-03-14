import { motion } from "motion/react";

export const MyComponent = () => {
  return (
    <motion.div
      drag
      dragTransition={{
        power: 0.5,  // Quanto forte l'oggetto è "lanciato"
        min: 0,      // Limite minimo
        max: 300,    // Limite massimo
        bounceStiffness: 200, // Elasticità del rimbalzo
        bounceDamping: 10,    // Ammortizzazione del rimbalzo
      }}
      style={{
        width: 100,
        height: 100,
        backgroundColor: "lightblue",
        borderRadius: 10,
      }}
    />
  );
};

export const DraggableCard = () => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 300, top: 0, bottom: 200 }} // Limita il drag a un'area rettangolare
      dragTransition={{
        power: 0.6, // Aumenta l'inerzia
        bounceStiffness: 100, // Rimbalzo meno rigido
        bounceDamping: 8, // Ammortizzazione più morbida
      }}
      style={{
        width: 150,
        height: 150,
        backgroundColor: "lightcoral",
        borderRadius: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: "white",
      }}
    >
      Trascinami!
    </motion.div>
  );
};

export const NewsArticlePage = () => {
  return (
    <div style={styles.page}>
      {/* Titolo dell'articolo */}
      <h1 style={styles.title}>Le Ultime Notizie del Giorno</h1>
      
      {/* Paragrafo principale */}
      <p style={styles.text}>
        Nel cuore della città, si è tenuto un evento straordinario che ha catturato l'attenzione di tutti. Scopri i dettagli di questa storia e molto altro.
      </p>

      {/* Sezione interattiva con Framer Motion */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 300, top: 0, bottom: 200 }}
        style={styles.draggableBox}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <p style={styles.quote}>“Le notizie ci fanno riflettere, ma l'azione ci rende protagonisti.”</p>
      </motion.div>

      {/* Continuazione dell'articolo */}
      <p style={styles.text}>
        Continua a leggere le ultime novità su ambiente, economia, tecnologia e cultura. Rimani aggiornato e fai sentire la tua voce!
      </p>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    lineHeight: "1.6",
    backgroundColor: "#f4f4f9",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "20px",
    color: "#555",
  },
  draggableBox: {
    width: "300px",
    height: "100px",
    backgroundColor: "#ffedd5",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px auto",
    cursor: "grab",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  quote: {
    fontSize: "1rem",
    fontStyle: "italic",
    color: "#333",
    textAlign: "center",
  },
};

